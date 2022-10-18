import { MouseEventHandler, ReactElement } from "react";

interface Props {
  children: ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
}

function ModalBase({ children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-50 flex flex-col justify-center items-center shadow-lg"
    >
      {children}
    </div>
  );
}

export default ModalBase;
