interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
}: TextAreaProps) {
  const classes = `
    bg-[var(--grey-50)] w-[568px] h-[84px]
    px-[16px] py-[12px]  
    text-[var(--color-${value?.length === 0 ? "grey-300" : "grey-800"})] 
    body
    focus:outline-none
    focus:border-none
    resize-none
  `;

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classes}
      placeholder={placeholder}
    ></textarea>
  );
}
