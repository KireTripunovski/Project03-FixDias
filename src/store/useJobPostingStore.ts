import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JobPosting {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  image: string;
  isUrgent: boolean;
  postedAt: string;
  status: "open" | "assigned" | "completed";
}

interface JobPostingState {
  posts: JobPosting[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  getFilteredPosts: () => JobPosting[];
}

const useJobPostingStore = create<JobPostingState>()(
  persist(
    (set, get) => ({
      posts: [],
      searchQuery: "",
      isLoading: false,
      error: null,

      fetchPosts: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("http://localhost:5001/jobPostings");
          if (!response.ok) {
            throw new Error("Failed to fetch job postings");
          }
          const data = await response.json();
          set({ posts: data, isLoading: false });
        } catch (error) {
          console.error("Error fetching job postings:", error);
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch job postings",
            isLoading: false,
          });
        }
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      getFilteredPosts: () => {
        const { posts, searchQuery } = get();
        if (!searchQuery.trim()) return posts;

        const lowerCaseQuery = searchQuery.toLowerCase();
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerCaseQuery) ||
            post.description.toLowerCase().includes(lowerCaseQuery)
        );
      },
    }),
    {
      name: "job-postings-storage",
    }
  )
);

export default useJobPostingStore;
