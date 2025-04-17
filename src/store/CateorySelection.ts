import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface CategoriesState {
  selectedMainCategory: Category | null;
  selectedSubcategories: Subcategory[];
  setSelectedMainCategory: (category: Category) => void;
  addSelectedSubcategory: (subcategory: Subcategory) => void;
  removeSelectedSubcategory: (subcategoryId: string) => void;
  clearSelections: () => void;
}

const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set) => ({
      selectedMainCategory: null,
      selectedSubcategories: [],

      setSelectedMainCategory: (category) => {
        set({ selectedMainCategory: category });
      },

      addSelectedSubcategory: (subcategory) => {
        set((state) => ({
          selectedSubcategories: [...state.selectedSubcategories, subcategory],
        }));
      },

      removeSelectedSubcategory: (subcategoryId) => {
        set((state) => ({
          selectedSubcategories: state.selectedSubcategories.filter(
            (sub) => sub.id !== subcategoryId
          ),
        }));
      },

      clearSelections: () => {
        set({ selectedMainCategory: null, selectedSubcategories: [] });
      },
    }),
    {
      name: "categories-storage",
    }
  )
);

export default useCategoriesStore;
