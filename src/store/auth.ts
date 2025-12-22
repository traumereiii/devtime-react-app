import { create } from "zustand";
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: {
  accessToken: string | null;
  refreshToken: string | null;
} = {
  accessToken: null,
  refreshToken: null,
};

export const useAuthStore = create(
  devtools(
    persist(
      immer(
        combine(initialState, (set, get) => ({
          isAuthenticated: () => {
            return !!get().accessToken;
          },
          actions: {
            setToken: (accessToken: string, refreshToken: string) => {
              set({ accessToken, refreshToken });
            },
            logout: () => {
              set({ accessToken: null, refreshToken: null });
            },
          },
        })), // end of combine
      ), // end of immer
      {
        name: "AuthStore",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      }, // options of persist
    ),
    { name: "AuthStore" }, // options of devtools
  ), // end of devtools
);
