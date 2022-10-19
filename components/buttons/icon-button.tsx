import { MouseEventHandler, ReactElement } from "react";

interface Props {
  icon: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function IconButton({ icon, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="h-[38px] w-[38px] rounded-[4px] hover:bg-grey2 active:bg-grey3 p-2 flex items-center justify-center"
    >
      <span className="w-[24px] h-[24px] fill-grey7">{icon}</span>
    </button>
  );
}

export default IconButton;
