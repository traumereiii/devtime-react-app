import type { ComponentProps, ReactNode } from "react";
import { useTextFieldContext } from "@/components/ui/text-field/TextFieldContext.tsx";

interface TextFieldInputProps extends ComponentProps<"input"> {
  children?: ReactNode;
}

export default function TextFieldInput({
  type,
  placeholder,
  children,
  className,
}: TextFieldInputProps) {
  const { value, setValue } = useTextFieldContext();

  return (
    <div className={className + " flex"}>
      <input
        className="text-field-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {children}
    </div>
  );
}
