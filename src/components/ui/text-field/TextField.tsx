import { type ReactNode } from "react";
import { TextFieldContext } from "@/components/ui/text-field/TextFieldContext.tsx";
import TextFieldLabel from "@/components/ui/text-field/TextFieldLabel.tsx";
import TextFieldInput from "@/components/ui/text-field/TextFieldInput.tsx";
import TextFieldHelperText from "@/components/ui/text-field/TextFieldHelperText.tsx";

interface TextFieldProps {
  value: string;
  setValue: (value: string) => void;
  validate?: {
    type: "informative" | "negative" | "primary";
    message: string;
  };
  children: ReactNode;
}

TextField.Label = TextFieldLabel;
TextField.Input = TextFieldInput;
TextField.HelperText = TextFieldHelperText;

export default function TextField({
  value,
  setValue,
  children,
}: TextFieldProps) {
  return (
    <TextFieldContext.Provider value={{ value, setValue }}>
      <div className="flex flex-col gap-[8px] w-full">{children}</div>
    </TextFieldContext.Provider>
  );
}
