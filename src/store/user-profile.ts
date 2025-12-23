import { combine, devtools } from "zustand/middleware";
import { create } from "zustand";
import type { UserProfile } from "@/types.ts";

const initialState: { userProfile: UserProfile | null } = {
  userProfile: null,
};

export const useUserProfileStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        setUser(userProfile: UserProfile) {
          set({ userProfile });
        },
      },
    })), // end of combine
    { name: "UserProfileStore" }, // options of devtools
  ), // end of devtools
);

export const useUserProfile = () =>
  useUserProfileStore((state) => state.userProfile);
