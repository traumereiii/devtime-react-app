import Button from "@/components/ui/Button.tsx";
import { useDialog } from "@/store/dialog.ts";
import { useEffect, useRef } from "react";

export default function Dialog() {
  const dialog = useDialog();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (dialog.open) {
      if (!el.open) el.showModal();
    } else {
      if (el.open) el.close();
    }
  }, [dialog.open]);

  return (
    <>
      <dialog
        ref={dialogRef}
        className="w-[328px] px-[24px] py-[24px]
                 rounded-[12px]
                 bg-white shadow-[0px 8px 8px 0px rgba(0, 0, 0, 0.05)]
                 absolute-center
                 "
      >
        {dialog.body ? (
          <>
            <div className="title-s text-[var(--grey-800)]">{dialog.title}</div>
            <div className="body mt-[8px] text-[var(--grey-600)]">
              {dialog.body}
            </div>
          </>
        ) : (
          <div className="sub-title-s text-[var(--grey-700)]">
            {dialog.title}
          </div>
        )}

        <div className="flex justify-end gap-[16px] mt-[24px]">
          {dialog.onNegative ? (
            <>
              <Button variant="secondary" onClick={dialog.onNegative.onClick}>
                {dialog.onNegative.label}
              </Button>
              <Button variant="primary" onClick={dialog.onPositive.onClick}>
                {dialog.onPositive.label}
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={dialog.onPositive.onClick}
              width="100%"
            >
              {dialog.onPositive.label}
            </Button>
          )}
        </div>
      </dialog>
    </>
  );
}
