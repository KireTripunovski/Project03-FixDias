import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAuthStore from "./useAuthStore";

interface ServiceCategory {
  categoryId: string;
  categoryName: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}

interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  state?: string;
  city?: string;
  zipCode?: string;
  coordinates?: LocationCoordinates;
  displayString?: string;
}

export interface HandymanProfile {
  id: string;
  userId: string;
  profession: string;
  serviceCategories?: ServiceCategory[];
  experience?: string;
  certifications?: string[];
  availability?: Record<string, { start: string; end: string }>;
  ratings?: number;
  completedJobs?: number;
  location?: Location;
  about?: string;
  services?: string;
  averageRating?: number;
  customSections?: Record<string, string>;
  income?: number;
  userName?: string;
}

interface ProfileState {
  profile: HandymanProfile | null;
  isLoading: boolean;
  error: string | null;
  newLocation: Location;
  setNewLocation: (location: Location) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (
    data: Partial<HandymanProfile>
  ) => Promise<{ success: boolean; message: string }>;
  updateLocation: (
    location: Location
  ) => Promise<{ success: boolean; message: string }>;
  updateCertifications: (
    certifications: string[]
  ) => Promise<{ success: boolean; message: string }>;
  updatePhoneNumber: (
    phoneNumber: string
  ) => Promise<{ success: boolean; message: string }>;
}

const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,
      newLocation: {
        state: "",
        city: "",
        zipCode: "",
        coordinates: { latitude: 0, longitude: 0 },
      },
      setNewLocation: (location) => set({ newLocation: location }),

      fetchProfile: async () => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          set({ error: "No authenticated user found", isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          // Fetch handyman profile
          const profileResponse = await fetch(
            `http://localhost:5001/handymanProfiles?userId=${authUser.id}`
          );

          if (!profileResponse.ok) {
            throw new Error("Failed to fetch handyman profile");
          }

          const profiles = await profileResponse.json();
          const handymanProfile = profiles[0] || null;

          // Fetch user preferences for categories
          const preferencesResponse = await fetch(
            `http://localhost:5001/userPreferences?userId=${authUser.id}`
          );

          if (!preferencesResponse.ok) {
            throw new Error("Failed to fetch user preferences");
          }

          const preferences = await preferencesResponse.json();
          const userPreference = preferences[0] || null;

          // Combine data
          const combinedProfile = handymanProfile
            ? {
                ...handymanProfile,
                serviceCategories: userPreference?.selectedCategories || [],
              }
            : null;

          set({ profile: combinedProfile, isLoading: false });
          set({
            newLocation: combinedProfile?.location || {
              state: "",
              city: "",
              zipCode: "",
              coordinates: { latitude: 0, longitude: 0 },
            },
          });
        } catch (error) {
          console.error("Profile fetch error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred fetching profile";
          set({ error: errorMessage, isLoading: false });
        }
      },

      updateProfile: async (
        data: Partial<HandymanProfile>
      ): Promise<{ success: boolean; message: string }> => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          return { success: false, message: "No authenticated user found" };
        }

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

          get().fetchProfile().catch(console.error);

          return {
            success: true,
            message: "Profile updated successfully",
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

      updateLocation: async (
        location: Location
      ): Promise<{ success: boolean; message: string }> => {
        const displayString =
          location.city && location.state
            ? `${location.city}, ${location.state}${
                location.zipCode ? ` ${location.zipCode}` : ""
              }`
            : "";

        const locationWithDisplay = {
          ...location,
          displayString,
        };

        return get().updateProfile({ location: locationWithDisplay });
      },

      updateCertifications: async (
        certifications: string[]
      ): Promise<{ success: boolean; message: string }> => {
        return get().updateProfile({ certifications });
      },

      updatePhoneNumber: async (
        phoneNumber: string
      ): Promise<{ success: boolean; message: string }> => {
        const authUser = useAuthStore.getState().user;

        if (!authUser) {
          return { success: false, message: "No authenticated user found" };
        }

        try {
          const updateResponse = await fetch(
            `http://localhost:5001/users/${authUser.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ phoneNumber }),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update phone number");
          }

          useAuthStore.setState({
            user: {
              ...authUser,
              phoneNumber,
            },
          });

          return {
            success: true,
            message: "Phone number updated successfully",
          };
        } catch (error) {
          console.error("Phone number update error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred updating phone number";
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

export default useProfileStore;
