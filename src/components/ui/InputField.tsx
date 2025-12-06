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
    text-[var(${value?.length === 0 ? "--grey-300" : "--grey-800"})] text-[16px] 
    font-[500]  
    border-none
    focus:outline-none
    focus:border-none
    `;

  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-[500] text-[14px] leading-[18px]">{label}</label>
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
