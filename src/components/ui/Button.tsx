import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant: ButtonVariant;
  children?: ReactNode;
}
const colorClasses = {
  primary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-10b)]",
  secondary: "bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-light-10b)]",
} as const;
export default function Button({ variant, children }: ButtonProps) {
  const shape = `min-w-[88px] h-[48px] py-[12px] px-[16px] rounded-[5px]`;
  const align = `flex justify-center items-center`;
  const text = `text-[18px] text-white font-[600]`;
  const focus = `focus:border-[1.5px] focus:border-[var(--color-fuchsia)]`;
  const etc = `cursor-pointer`;

  const classes = `${colorClasses[variant]} ${shape} ${align} ${text} ${focus} ${etc}`;

  return <div className={classes}>{children}</div>;
}
