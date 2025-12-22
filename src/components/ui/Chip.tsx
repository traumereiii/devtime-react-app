import X from "@/assets/icon/x.svg";

interface ChipProps {
  label: string;
  onDelete?: () => void;
}

export default function Chip({ label, onDelete }: ChipProps) {
  return (
    <div className="border border-primary rounded-[5px] h-[44px] px-[12px] py-[12px] bg-[var(--color-primary-10)] text-primary body-s flex gap-[8px] items-center cursor-pointer">
      {label}
      {onDelete && <img src={X} alt="" onClick={onDelete} />}
    </div>
  );
}
