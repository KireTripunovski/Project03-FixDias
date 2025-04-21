import { create } from "zustand";

export interface Feedback {
  id: string;
  handymanId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  location: string;
  createdAt: string;
}

interface FeedbackState {
  feedback: Feedback[];
  averageRating: number;
  isLoading: boolean;
  reviewCount: number;
  error: string | null;
  fetchFeedback: (handymanId: string) => Promise<void>;
}

const useFeedbackStore = create<FeedbackState>()((set) => ({
  feedback: [],
  averageRating: 0,
  reviewCount: 0,
  isLoading: false,
  error: null,

  fetchFeedback: async (handymanId: string) => {
    if (!handymanId) {
      set({ error: "No handyman ID provided", isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `http://localhost:5001/feedback?handymanId=${handymanId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }

      const feedback = await response.json();

      const averageRating =
        feedback.length > 0
          ? feedback.reduce(
              (sum: number, item: Feedback) => sum + item.rating,
              0
            ) / feedback.length
          : 0;

      set({
        feedback,
        averageRating: Number.parseFloat(averageRating.toFixed(1)),
        reviewCount: feedback.length,
        isLoading: false,
      });
    } catch (error) {
      console.error("Feedback fetch error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred fetching feedback";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

export default useFeedbackStore;
