type InputFieldType = "text" | "password";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type: InputFieldType;
  readonly?: boolean;
}

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
  type,
  readonly,
}: InputFieldProps) {
  const classes = `
    bg-[var(--grey-100)] px-[24px] py-[16px]
    text-[var(${value?.length === 0 ? "--grey-300" : "--grey-800"})] 
    body
    border-none
    focus:outline-none
    focus:border-none
    `;

  return (
    <div className="flex flex-col gap-[8px]">
      <label className="body-small">{label}</label>
      <input
        className={classes}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readonly !== undefined ? readonly : false}
      />
    </div>
  );
}
