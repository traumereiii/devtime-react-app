import type { ReactNode } from "react";

type TextFieldHelperTextVariant = "informative" | "positive" | "negative";

interface TextFieldHelperTextProps {
  variant: TextFieldHelperTextVariant;
  children?: ReactNode;
}

export default function TextFieldHelperText({
  variant,
  children,
}: TextFieldHelperTextProps) {
  if (!children) return null;

  switch (variant) {
    case "informative":
      return <p className={`caption text-informative`}>{children}</p>;
    case "positive":
      return <p className={`caption text-positive`}>{children}</p>;
    case "negative":
      return <p className={`caption text-negative`}>{children}</p>;
    default:
      break;
  }
}
