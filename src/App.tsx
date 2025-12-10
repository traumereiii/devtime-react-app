import AppRoutes from "./AppRoutes.tsx";
import DialogProvider from "@/providers/DialogProvider.tsx";

function App() {
  return (
    <>
      <DialogProvider>
        <AppRoutes />
      </DialogProvider>
    </>
  );
}

export default App;
