import { useAuthStore } from "@/store/auth.ts";
import { api } from "@/api";
import { type ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const authStore = useAuthStore();

  useEffect(() => {
    console.log("isAuthenticated: ", authStore.isAuthenticated());
    if (authStore.isAuthenticated()) {
      api.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
        return config;
      });
    } else {
      api.interceptors.request.clear();
    }
  }, [authStore.accessToken]);

  return children;
}
