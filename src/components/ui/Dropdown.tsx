import { useEffect, useRef, useState } from "react";
import ChevronUp from "@/assets/image/chevron-up.png";
import ChevronDown from "@/assets/image/chevron-down.png";

interface DropdownItem<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  label: string;
  placeholder?: string;
  items: DropdownItem<T>[];
  onChange: (value: T) => void;
}

export default function Dropdown<T>({
  label,
  placeholder,
  items,
  onChange,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectedItem = selectedIndex > -1 ? items[selectedIndex] : null;
  const handleDropdownClick = () => setIsOpen(!isOpen);

  const handleItemSelect = (index: number) => {
    setSelectedIndex(index);
    onChange(items[index].value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //useEffect(() => {}, [value]);

  return (
    <div className="flex flex-col gap-[8px]" ref={dropdownRef}>
      <label>{label}</label>
      <div className="relative">
        <div
          className="bg-[var(--grey-100)] h-[44px] w-full pl-[12px] pr-[16px] py-[12px]
                    relative
                    text-[var(--grey-300)]
                    cursor-pointer
                     "
          onClick={handleDropdownClick}
        >
          {selectedItem ? selectedItem.label : placeholder}
          {isOpen ? (
            <img
              src={ChevronUp}
              alt=""
              className="absolute top-[10px] right-[12px]"
            />
          ) : (
            <img
              src={ChevronDown}
              alt=""
              className="absolute top-[10px] right-[12px]"
            />
          )}
        </div>

        {isOpen && (
          <div
            className="
                    rounded-[5px] px-[12px] py-[16px] bg-white
                    border border-[var(--grey-300)]
                    flex flex-col gap-[16px]
                    absolute left-0 right-0
                    cursor-pointer z-10
                    "
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="text-[var(--grey-600)] hover:text-[var(--color--informative)]
                         body hover:body-b
                         pb-[16px] border-b border-[var(--grey-300)]
                         last:border-b-0 last:pb-0"
                onClick={() => handleItemSelect(index)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
