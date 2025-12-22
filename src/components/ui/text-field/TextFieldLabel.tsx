import type { ReactNode } from "react";

export default function TextFieldLabel({ children }: { children: ReactNode }) {
  return <label>{children}</label>;
}
