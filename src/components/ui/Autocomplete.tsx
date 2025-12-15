import { type KeyboardEvent } from "react";
import Plus from "@/assets/icon/plus.svg";

interface AutocompleteProps {
  label: string;
  placeholder?: string;
  search: string;
  onSearchChange: (value: string) => void;
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
  //const [search, setSearch] = useState("");
  const filtered = search
    ? values.filter((item) => item.startsWith(search))
    : [];

  const handleComplete = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onComplete(search);
      onSearchChange("");
    }
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <div>{label}</div>
      <div className="relative">
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
            className="absolute left-0 right-0 mt-[8px]
                        border border-[var(--grey-300)] rounded-[5px]
                        px-[12px] py-[16px] flex flex-col gap-[16px] cursor-pointer"
          >
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <div key={index}>
                  <span className="body-s text-[var(--grey-800)]">
                    {search}
                  </span>
                  <span className="body-r text-[var(--grey-600)]">
                    {item.substring(search.length)}
                  </span>
                </div>
              ))
            ) : (
              <div>
                <span className="body-s text-[var(--color--informative)] flex gap-[4px]">
                  <img src={Plus} alt="" />
                  Add New Item
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
