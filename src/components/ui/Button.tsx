import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children?: ReactNode;
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
