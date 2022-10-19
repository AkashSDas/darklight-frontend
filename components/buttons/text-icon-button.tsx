import { MouseEventHandler, ReactElement } from "react";

interface Props {
  icon: ReactElement;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function TextIconButton({ icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="h-[38px] -text-body2 rounded-[4px] text-grey7 hover:bg-grey2 active:bg-grey3 p-2 flex gap-2 items-center justify-center"
    >
      <span className="w-[20px] h-[20px] fill-grey7">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default TextIconButton;
