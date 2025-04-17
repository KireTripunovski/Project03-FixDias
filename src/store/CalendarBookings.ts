import { create } from "zustand";
import axios from "axios";
import { CalendarBooking } from "../types/types";

interface BookingStore {
  bookings: CalendarBooking[];
  isLoading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (
    booking: Omit<CalendarBooking, "id" | "dateCreatedAt">
  ) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  isLoading: false,
  error: null,
  fetchBookings: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get<CalendarBooking[]>(
        "http://localhost:5001/calendarbookings"
      );
      set({ bookings: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch bookings", isLoading: false });
    }
  },
  addBooking: async (booking) => {
    set({ isLoading: true });
    try {
      const newBooking = {
        ...booking,
        dateCreatedAt: new Date().toISOString(),
      };

      const response = await axios.post<CalendarBooking>(
        "http://localhost:5001/calendarbookings",
        newBooking
      );

      set((state) => ({
        bookings: [...state.bookings, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add booking", isLoading: false });
    }
  },
  deleteBooking: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`http://localhost:5001/calendarbookings/${id}`);
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete booking", isLoading: false });
    }
  },
}));

export default useBookingStore;
