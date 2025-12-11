import AddImage from "@/components/ui/AddImage.tsx";
import { useState } from "react";

export default function IndexPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <AddImage label="Label" file={file} onChange={setFile} />
      </div>
    </div>
  );
}
