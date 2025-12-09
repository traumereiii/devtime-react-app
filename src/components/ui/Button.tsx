import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant: ButtonVariant;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
}

export default function Button({
  variant,
  children,
  disabled,
  onClick,
  width,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant}`}
      disabled={disabled !== undefined ? disabled : false}
      onClick={onClick}
      style={{ width }}
    >
      {children}
    </button>
  );
}
