import { MouseEventHandler } from "react";

interface Props {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function TextButton({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={
        "h-[38px] -text-body2 rounded-[4px] text-grey7 hover:bg-grey2 active:bg-grey3 p-2 flex gap-2 items-center justify-center"
      }
    >
      {label}
    </button>
  );
}

export default TextButton;
