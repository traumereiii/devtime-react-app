import { type ReactNode, useEffect, useState } from "react";

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
  label: string;
  type: TextFieldInputType;
  value: string;
  onChange: (value: string) => void;
  validate?: (value: string) => TextFieldValidateResult;
  placeholder: string;
  width: string;
  action?: TextFieldAction;
}

export default function TextField({
  label,
  onChange,
  type,
  value,
  placeholder,
  action,
  validate,
  width,
}: TextFieldProps) {
  const [validateResult, setValidateResult] =
    useState<TextFieldValidateResult>();

  useEffect(() => {
    if (!validate) return;
    const result = validate(value);
    setValidateResult(result);
  }, [value, validate]);

  return (
    <div className="flex flex-col gap-[8px]" style={{ width }}>
      <label>{label}</label>
      <div className="flex gap-[12px]">
        <TextFieldInput
          type={type}
          value={value}
          onChange={(newVal) => {
            onChange(newVal);
            if (validate) {
              setValidateResult(validate(newVal));
            }
          }}
          placeholder={placeholder}
        />
        {action && (
          <TextFieldButton
            disabled={action.disabled}
            onClick={() => action!.onClick(value)}
          >
            {action.label}
          </TextFieldButton>
        )}
      </div>
      {validateResult && (
        <TextFieldHelperText variant={validateResult.type}>
          {validateResult.message}
        </TextFieldHelperText>
      )}
    </div>
  );
}

type TextFieldInputType = "text" | "password";

interface TextFieldInputProps {
  type: TextFieldInputType;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
function TextFieldInput({
  type,
  value,
  onChange,
  placeholder,
}: TextFieldInputProps) {
  return (
    <input
      className="text-field-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
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

type TextFieldHelperTextVariant = "informative" | "error" | "success";
interface TextFieldHelperTextProps {
  variant: TextFieldHelperTextVariant;
  children?: ReactNode;
}
function TextFieldHelperText({ variant, children }: TextFieldHelperTextProps) {
  return (
    <p className={`text-field-helper-text text-field-helper-text-${variant}`}>
      {children}
    </p>
  );
}
