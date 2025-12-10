import { createPortal } from "react-dom";
import Dialog from "@/components/ui/Dialog.tsx";
import type { ReactNode } from "react";

export default function DialogProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          {/*<div className="backdrop-brightness-50 h-[100vh] w-[100vw] absolute z-10"></div>*/}
          <Dialog />
        </>,
        document.getElementById("dialog-root")!,
      )}
      {children}
    </>
  );
}
