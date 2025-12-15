import { type ReactNode, useEffect, useState } from "react";
import { TextFieldContext } from "@/components/ui/text-field/TextFieldContext.tsx";
import TextFieldLabel from "@/components/ui/text-field/TextFieldLabel.tsx";
import TextFieldInput from "@/components/ui/text-field/TextFieldInput.tsx";
import TextFieldHelperText from "@/components/ui/text-field/TextFieldHelperText.tsx";

export type TextFiledValidator = (value: string) => TextFieldValidateResult;

export type TextFieldValidateResult =
  | {
      type: TextFieldHelperTextVariant;
      message: string;
    }
  | undefined;

interface TextFieldAction {
  label: string;
  onClick: (value: string) => void;
  disabled?: boolean;
}

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
  // const [validateResult, setValidateResult] =
  //   useState<TextFieldValidateResult>();
  //
  // useEffect(() => {
  //   if (!validate) return;
  //   const result = validate(value);
  //   setValidateResult(result);
  // }, [value, validate]);

  // const [valueInner, setValueInner] = useState(value);

  return (
    <TextFieldContext.Provider value={{ value, setValue }}>
      <div className="flex flex-col gap-[8px] w-full">{children}</div>
    </TextFieldContext.Provider>
  );

  // return (
  //   <div className="flex flex-col gap-[8px]" style={{ width }}>
  //     {label && <label>{label}</label>}
  //     <div className="flex gap-[12px]">
  //       <TextFieldInput
  //         type={type}
  //         value={value}
  //         onChange={(newVal) => {
  //           onChange(newVal);
  //           if (validate) {
  //             setValidateResult(validate(newVal));
  //           }
  //         }}
  //         placeholder={placeholder}
  //       />
  //       {action && (
  //         <TextFieldButton
  //           disabled={action.disabled}
  //           onClick={() => action!.onClick(value)}
  //         >
  //           {action.label}
  //         </TextFieldButton>
  //       )}
  //     </div>
  //     {validateResult && (
  //       <TextFieldHelperText variant={validateResult.type}>
  //         {validateResult.message}
  //       </TextFieldHelperText>
  //     )}
  //   </div>
  // );
}

interface TextFieldButtonProps {
  disabled?: boolean;
  children?: ReactNode;
  onClick: () => void;
}
function TextFieldButton({
  disabled,
  children,
  onClick,
}: TextFieldButtonProps) {
  return (
    <button
      type="button"
      className="text-field-btn"
      disabled={disabled !== undefined ? disabled : false}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
