import { useState, type KeyboardEvent } from "react";
import Plus from "@/assets/icon/plus.svg";

interface AutocompleteProps {
  label: string;
  placeholder?: string;
  values: string[];
  onComplete: (value: string) => void;
}

export default function Autocomplete({
  label,
  placeholder,
  search,
  onSearchChange,
  values,
  onComplete,
}: AutocompleteProps) {
  const handleComplete = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onComplete(search);
    }
  };
  const handleItemClick = (item: string) => {
    onComplete(item);
    onSearchChange("");
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <div>{label}</div>
      <div className="relative overflow-visible">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => handleComplete(e)}
          type="text"
          className="bg-[var(--grey-50)] h-[44px] w-full text-[var(--grey-300)] px-[12px] py-[16px]"
          placeholder={placeholder}
        />
        {search && (
          <div
            className="absolute z-[9999] left-0 right-0 mt-[8px]
                        border border-[var(--grey-300)] rounded-[5px] bg-white
                        px-[12px] py-[16px] flex flex-col gap-[16px] cursor-pointer"
          >
            {[
              ...values.map((item, index) => (
                <div key={index} onClick={() => handleItemClick(item)}>
                  <span className="body-s text-[var(--grey-800)]">
                    {search}
                  </span>
                  <span className="body-r text-[var(--grey-600)]">
                    {item.substring(search.length)}
                  </span>
                </div>
              )),
              <div onClick={() => handleItemClick(search)}>
                <span className="body-s text-[var(--color--informative)] flex gap-[4px]">
                  <img src={Plus} alt="" />
                  Add New Item
                </span>
              </div>,
            ]}
          </div>
        )}
      </div>
    </div>
  );
}
