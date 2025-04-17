import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import useAuthStore from "./authStore";

export interface Listing {
  id: string;
  handymanId: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    state: string;
  };
  createdAt: string;
  serviceCategories?: string[];
  isActive: boolean;
}

interface ListingsState {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  fetchListings: () => Promise<void>;
  createListing: (
    data: Omit<Listing, "id" | "handymanId" | "createdAt" | "isActive">
  ) => Promise<boolean>;
  updateListing: (id: string, data: Partial<Listing>) => Promise<boolean>;
  deleteListing: (id: string) => Promise<boolean>;
  clearListings: () => void;
}

const useListingsStore = create<ListingsState>()(
  persist(
    (set, get) => ({
      listings: [],
      isLoading: false,
      error: null,
      clearListings: () => {
        set({ listings: [], isLoading: false, error: null });
      },
      fetchListings: async () => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          set({ error: "No authenticated user found", isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:5001/handymanListings?handymanId=${authUser.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch listings");
          }

          const listings = await response.json();
          set({ listings, isLoading: false });
        } catch (error) {
          console.error("Listings fetch error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred fetching listings";
          set({ error: errorMessage, isLoading: false });
        }
      },

      createListing: async (data) => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          set({ error: "No authenticated user found", isLoading: false });
          return false;
        }

        set({ isLoading: true, error: null });

        try {
          const newListing: Listing = {
            id: uuidv4(),
            handymanId: authUser.id,
            createdAt: new Date().toISOString(),
            isActive: true,
            ...data, // This includes title, description, and location
          };

          const response = await fetch(
            `http://localhost:5001/handymanListings`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newListing),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to create listing");
          }

          await get().fetchListings();
          return true;
        } catch (error) {
          console.error("Listing creation error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred creating listing";
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      updateListing: async (id, data) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:5001/handymanListings/${id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch listing");
          }

          const listing = await response.json();
          const updatedListing = { ...listing, ...data };

          const updateResponse = await fetch(
            `http://localhost:5001/handymanListings/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedListing),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update listing");
          }

          await get().fetchListings();
          return true;
        } catch (error) {
          console.error("Listing update error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred updating listing";
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      deleteListing: async (id) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:5001/handymanListings/${id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete listing");
          }

          await get().fetchListings();
          return true;
        } catch (error) {
          console.error("Listing deletion error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred deleting listing";
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },
    }),
    {
      name: "listings-storage",
      partialize: (state) => ({ listings: state.listings }),
    }
  )
);

export default useListingsStore;
