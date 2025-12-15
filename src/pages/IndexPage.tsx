import AddImage from "@/components/ui/AddImage.tsx";
import { useState } from "react";
import Dropdown from "@/components/ui/Dropdown.tsx";
import Autocomplete from "@/components/ui/Autocomplete.tsx";
import Chip from "@/components/ui/Chip.tsx";
import Select from "@/components/ui2/Select.tsx";
import Button from "@/components/ui/Button.tsx";

interface User {
  id: number;
  name: string;
  age: number;
}

export default function IndexPage() {
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const users = [
    { id: 1, name: "가렌", age: 24 },
    { id: 2, name: "갈리오", age: 800 },
    { id: 3, name: "갱플랭크", age: 46 },
  ];

  const [items, setItems] = useState([
    "AAABC",
    "AABBYF",
    "AACDDFG",
    "AAGHR",
    "AAATHCHYYU",
  ]);

  const options = [
    { id: 1, label: "Katarina", value: "katarina" },
    { id: 2, label: "Garen", value: "garen" },
    { id: 3, label: "Ahri", value: "ahri" },
    { id: 4, label: "Lux", value: "lux" },
    { id: 5, label: "Yasuo", value: "yasuo" },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <div>
        <AddImage label="Label" file={file} onChange={setFile} />
      </div>
      <div className="w-[147px]">
        <Dropdown<User>
          label="Dropdown Label"
          placeholder="Placeholder"
          items={users.map((it) => ({ label: it.name, value: it }))}
          onChange={setUser}
        ></Dropdown>
      </div>
      <div>
        {/*<Autocomplete*/}
        {/*  label="AUtocomplete Label"*/}
        {/*  placeholder="Placeholder"*/}
        {/*  values={items}*/}
        {/*  onComplete={(item) => setItems([...items, item])}*/}
        {/*/>*/}
      </div>
      <div className="flex justify-start gap-2">
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => setItems(items.filter((it) => it !== item))}
          />
        ))}
      </div>
      <div className="flex justify-start gap-2">
        <Select>
          <Select.Trigger></Select.Trigger>
          <Select.Options options={options}></Select.Options>
          <Button variant="primary"></Button>
        </Select>
      </div>
      <div className="flex justify-start gap-2"></div>
    </div>
  );
}
