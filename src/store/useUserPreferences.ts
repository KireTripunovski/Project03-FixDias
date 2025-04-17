import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SubcategoryPreference {
  id: string;
  name: string;
}

interface CategoryPreference {
  categoryId: string;
  categoryName: string;
  subcategories: SubcategoryPreference[];
}

interface UserPreferencesState {
  preferences: {
    selectedCategories?: CategoryPreference[];
  } | null;
  isLoading: boolean;
  error: string | null;
  fetchUserPreferences: (userId: string) => Promise<void>;
}

const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      preferences: null,
      isLoading: false,
      error: null,

      fetchUserPreferences: async (userId: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:5001/userPreferences?userId=${userId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user preferences");
          }

          const preferences = await response.json();
          const userPreference = preferences[0] || null;

          set({ preferences: userPreference, isLoading: false });
        } catch (error) {
          console.error("User preferences fetch error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred fetching preferences";
          set({ error: errorMessage, isLoading: false });
        }
      },
    }),
    {
      name: "user-preferences-storage",
    }
  )
);

export default useUserPreferencesStore;
