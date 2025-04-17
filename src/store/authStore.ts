import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import {
  LoginCredentials,
  SignUpData,
  User,
  AuthResponse,
} from "../types/types";
import useListingsStore from "./ListingStore";

interface AuthState {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<AuthResponse>;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      signUp: async (data: SignUpData): Promise<AuthResponse> => {
        set({ isLoading: true, error: null });

        try {
          if (
            !data.name ||
            !data.email ||
            !data.password ||
            !data.confirmPassword ||
            !data.phoneNumber
          ) {
            set({ error: "All fields are required", isLoading: false });
            return { success: false, message: "All fields are required" };
          }

          if (data.password !== data.confirmPassword) {
            set({ error: "Passwords do not match", isLoading: false });
            return { success: false, message: "Passwords do not match" };
          }

          const checkResponse = await fetch(
            `http://localhost:5001/users?email=${encodeURIComponent(
              data.email
            )}`
          );

          if (!checkResponse.ok) {
            throw new Error("Failed to check existing users");
          }

          const existingUsers = await checkResponse.json();

          if (existingUsers.length > 0) {
            set({
              error: "User with this email already exists",
              isLoading: false,
            });
            return {
              success: false,
              message: "User with this email already exists",
            };
          }

          // Create new user
          const newUser: User = {
            id: uuidv4(),
            name: data.name,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            userType: data.userType,
          };

          // Add user to database
          const response = await fetch("http://localhost:5001/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });

          if (!response.ok) {
            throw new Error("Failed to create user");
          }
          if (newUser.userType === "handyman") {
            const handymanProfile = {
              id: uuidv4(),
              userId: newUser.id,
              experience: "",
              certifications: [],
              location: "",
              about: "",
              services: "",
              completedJobs: 0,
              averageRating: 0,
            };

            const userPreferences = {
              id: uuidv4(),
              userId: newUser.id,
              selectedCategories: [],
            };

            const profileResponse = await fetch(
              "http://localhost:5001/handymanProfiles",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(handymanProfile),
              }
            );

            const preferencesResponse = await fetch(
              "http://localhost:5001/userPreferences",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userPreferences),
              }
            );

            if (!profileResponse.ok || !preferencesResponse.ok) {
              console.error(
                "Created user but failed to create handyman records"
              );
            }
          }
          // store
          const { password: _password, ...userWithoutPassword } = newUser;
          set({ user: userWithoutPassword, isLoading: false });

          return {
            success: true,
            message: "Registration successful",
            user: userWithoutPassword,
            requiresOnboarding: true,
          };
        } catch (error) {
          console.error("Sign up error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred during registration";

          set({
            error: errorMessage,
            isLoading: false,
          });

          return { success: false, message: errorMessage };
        }
      },

      login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        set({ isLoading: true, error: null });

        try {
          if (!credentials.email || !credentials.password) {
            set({ error: "Email and password are required", isLoading: false });
            return {
              success: false,
              message: "Email and password are required",
            };
          }

          // Find user
          const response = await fetch(
            `http://localhost:5001/users?email=${encodeURIComponent(
              credentials.email
            )}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const users = await response.json();

          if (users.length === 0) {
            set({ error: "User not found", isLoading: false });
            return { success: false, message: "User not found" };
          }

          const user = users[0];

          // Check password
          if (user.password !== credentials.password) {
            set({ error: "Invalid password", isLoading: false });
            return { success: false, message: "Invalid password" };
          }

          // Store user
          const { password: _password, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isLoading: false });
          useListingsStore.getState().fetchListings();

          return {
            success: true,
            message: "Login successful",
            user: userWithoutPassword,
          };
        } catch (error) {
          console.error("Login error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An error occurred during login";

          set({ error: errorMessage, isLoading: false });
          return { success: false, message: errorMessage };
        }
      },

      logout: () => {
        set({ user: null, error: null });
        useListingsStore.getState().clearListings();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
