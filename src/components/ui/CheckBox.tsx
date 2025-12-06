import Check from "@/assets/icon/check.svg";

interface CheckBoxProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function CheckBox({ value, onChange }: CheckBoxProps) {
  return (
    <div className="relative inline-flex">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="
          appearance-none
          w-[18px] h-[18px]
          border-[1px] border-[var(--color-primary)]
          rounded-[5px]
          cursor-pointer
          checked:bg-[var(--color-primary-10)]
          checked:border-[var(--color-primary)]
        "
      />

      {value && (
        <span
          className="
          pointer-events-none
          absolute inset-0
          flex items-center justify-center
          opacity-100 peer-checked:opacity-0
        "
        >
          <img src={Check} alt="" className="w-[12px] h-[12px]" />
        </span>
      )}
    </div>
  );
}
