import Plus from "@/assets/image/plus.png";
import { type ChangeEvent, useRef } from "react";

interface AddImageProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function AddImage({ label, file, onChange }: AddImageProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleAreaClick = () => {
    fileRef.current?.click();
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      onChange(e.target.files[0] || null);
    } catch (error) {
      console.error(error);
      onChange(null);
    }
  };

  return (
    <div className="w-[302px] flex flex-col gap-[8px]">
      <label>{label}</label>
      <div className="flex gap-[12px]">
        <div
          className="border border-dotted border-primary w-[120px] h-[120px]  rounded-[5px] relative cursor-pointer"
          onClick={handleAreaClick}
        >
          {!file && (
            <img src={Plus} alt="추가" className="absolute absolute-center" />
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="w-full h-full hidden"
            onChange={handleChangeFile}
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex items-end">
          <p className="label text-[var(--grey-500)]">
            5MB 미만의 .png, .jpeg, .gif 파일
          </p>
        </div>
      </div>
    </div>
  );
}
