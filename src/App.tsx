import AppRoutes from "./AppRoutes.tsx";
import DialogProvider from "@/providers/DialogProvider.tsx";
import { useAuthStore } from "@/store/auth.ts";
import { useUserProfileStore } from "@/store/user-profile.ts";
import { fetchUserProfile } from "@/api/profile.ts";
import { useEffect } from "react";

function App() {
  const authStore = useAuthStore();
  const userProfileStore = useUserProfileStore();

  useEffect(() => {
    if (authStore.isAuthenticated()) {
      fetchUserProfile().then((userProfile) => {
        userProfileStore.actions.setUser(userProfile);
      });
    }
  }, [authStore.accessToken]);

  return (
    <>
      <DialogProvider>
        <AppRoutes />
      </DialogProvider>
    </>
  );
}

export default App;
