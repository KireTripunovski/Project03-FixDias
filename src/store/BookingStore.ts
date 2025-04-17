import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAuthStore from "./authStore";
import { Booking } from "../types/types";

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  updateBookingStatus: (
    bookingId: string,
    status: "accepted" | "rejected" | "completed"
  ) => Promise<boolean>;
}

const useBookingsStore = create<BookingsState>()(
  persist(
    (set) => ({
      bookings: [],
      isLoading: false,
      error: null,

      fetchBookings: async () => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          set({ error: "No authenticated user found", isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:5001/bookings?handymanId=${authUser.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch bookings");
          }

          const bookings = await response.json();
          set({ bookings, isLoading: false });
        } catch (error) {
          console.error("Bookings fetch error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred fetching bookings";
          set({ error: errorMessage, isLoading: false });
        }
      },

      updateBookingStatus: async (bookingId, status) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:5001/bookings/${bookingId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status }),
            }
          );

          if (!response.ok) throw new Error("Failed to update booking status");

          set((state) => ({
            bookings: state.bookings.map((booking) =>
              booking.id === bookingId ? { ...booking, status } : booking
            ),
            isLoading: false,
          }));

          return true;
        } catch (error) {
          console.error("Booking update error:", error);
          set({
            error: error instanceof Error ? error.message : "Update failed",
            isLoading: false,
          });
          return false;
        }
      },
    }),
    {
      name: "bookings-storage",
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
);

export default useBookingsStore;
