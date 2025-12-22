import { createContext, type ReactNode, useContext, useState } from "react";

type SelectContextType = {
  value: string;
  isOpen: boolean;
  setValue: (value: string) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used with in a Select");
  }
  return context;
};

const Select = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, isOpen, setValue, setIsOpen }}>
      {children}
    </SelectContext.Provider>
  );
};

const Trigger = () => {
  const { value, isOpen, setIsOpen } = useSelectContext();

  return (
    <button
      className="border px-8 py-4 rounded bg-primary text-white"
      onClick={() => setIsOpen(!isOpen)}
    >
      {value || "Select an option"}
    </button>
  );
};

const Options = ({
  options,
}: {
  options: { id: number; label: string; value: string }[];
}) => {
  const { value, isOpen, setIsOpen, setValue } = useSelectContext();

  if (!isOpen) return null;

  return (
    <ul>
      {options.map((it) => (
        <li
          onClick={() => {
            setValue(it.value);
            setIsOpen(false);
          }}
        >
          {it.label}
          {value === it.value ? "(Selected)" : ""}
        </li>
      ))}
    </ul>
  );
};

Select.Trigger = Trigger;
Select.Options = Options;

export default Select;
