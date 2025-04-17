import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAuthStore from "./authStore";

interface HandymanProfile {
  userId: string;
  profession: string;
  certifications?: string[];
  location?: string;
}

interface HandymanProfileState {
  profile: HandymanProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchHandymanProfile: () => Promise<void>;
  updateHandymanProfile: (
    data: Partial<HandymanProfile>
  ) => Promise<{ success: boolean; message: string }>;
}

const useHandymanProfileStore = create<HandymanProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,

      fetchHandymanProfile: async () => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          set({ error: "No authenticated user found", isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:5001/handymanProfiles?userId=${authUser.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch handyman profile");
          }

          const profiles = await response.json();
          const handymanProfile = profiles[0] || null;

          set({ profile: handymanProfile, isLoading: false });
        } catch (error) {
          console.error("Handyman profile fetch error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred fetching profile";
          set({ error: errorMessage, isLoading: false });
        }
      },

      updateHandymanProfile: async (
        data: Partial<HandymanProfile>
      ): Promise<{ success: boolean; message: string }> => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          return { success: false, message: "No authenticated user found" };
        }

        set({ isLoading: true, error: null });

        try {
          // Check if profile exists
          const response = await fetch(
            `http://localhost:5001/handymanProfiles?userId=${authUser.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch handyman profile");
          }

          const profiles = await response.json();
          const existingProfile = profiles[0];

          if (existingProfile) {
            // Update existing profile
            const updatedProfile = { ...existingProfile, ...data };

            const updateResponse = await fetch(
              `http://localhost:5001/handymanProfiles/${existingProfile.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
              }
            );

            if (!updateResponse.ok) {
              throw new Error("Failed to update handyman profile");
            }
          } else {
            // Create new profile
            const newProfile = {
              userId: authUser.id,
              ...data,
            };

            const createResponse = await fetch(
              `http://localhost:5001/handymanProfiles`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newProfile),
              }
            );

            if (!createResponse.ok) {
              throw new Error("Failed to create handyman profile");
            }
          }

          await get().fetchHandymanProfile();

          return {
            success: true,
            message: "Handyman profile updated successfully",
          };
        } catch (error) {
          console.error("Profile update error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred updating profile";
          set({ error: errorMessage, isLoading: false });
          return { success: false, message: errorMessage };
        }
      },
    }),
    {
      name: "handyman-profile-storage",
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);

export default useHandymanProfileStore;
