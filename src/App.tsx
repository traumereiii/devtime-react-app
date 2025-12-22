import AppRoutes from "./AppRoutes.tsx";
import DialogProvider from "@/providers/DialogProvider.tsx";
import AuthProvider from "@/providers/AuthProvider.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <DialogProvider>
          <AppRoutes />
        </DialogProvider>
      </AuthProvider>
    </>
  );
}

export default App;
