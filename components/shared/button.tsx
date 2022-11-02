import { MouseEventHandler } from "react";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  variant: "text" | "contained" | "outlined";
  size: "md" | "lg";
  className?: string;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button(props: Props) {
  var { variant, size } = props;
  var baseStyle =
    "font-urbanist font-semibold text-base rounded-2xl px-6 flex justify-center items-center gap-2";

  if (variant == "contained") {
    var btnStyle = "bg-[#3A4EFF] text-white";
  } else if (variant == "outlined") {
    var btnStyle = "bg-white text-black border border-solid border-[#E9E9E9]";
  } else if (variant == "text") {
    var btnStyle = "bg-transparent text-black";
  }

  if (size == "lg") var sizeStyle = "h-12";
  if (size == "md") var sizeStyle = "h-11";

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${baseStyle} ${btnStyle} ${sizeStyle} ${props.className} disabled:bg-gray-300`}
    >
      {props.startIcon && <span>{props.startIcon}</span>}{" "}
      <span>{props.label}</span>
    </button>
  );
}
