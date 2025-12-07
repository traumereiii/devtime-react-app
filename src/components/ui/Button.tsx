import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant: ButtonVariant;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  variant,
  children,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant}`}
      disabled={disabled !== undefined ? disabled : false}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
