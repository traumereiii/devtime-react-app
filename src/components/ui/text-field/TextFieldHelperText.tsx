import type { ReactNode } from "react";

type TextFieldHelperTextVariant = "informative" | "negative" | "primary";

interface TextFieldHelperTextProps {
  variant: TextFieldHelperTextVariant;
  children?: ReactNode;
}

export default function TextFieldHelperText({
  variant,
  children,
}: TextFieldHelperTextProps) {
  if (!children) return null;
  return <p className={`caption text-${variant}`}>{children}</p>;
}
