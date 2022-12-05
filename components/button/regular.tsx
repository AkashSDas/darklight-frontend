import { MouseEventHandler } from "react";

import styles from "../../styles/components/button/regular.module.css";

interface Props {
  children: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant: "text" | "contained";
  type?: "button" | "submit" | "reset";
}

export function Button({ children, onClick, variant, type }: Props) {
  if (variant == "text") var variantStyle = styles.btn__text;
  else if (variant == "contained") var variantStyle = styles.btn__contained;
  else variantStyle = "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${variantStyle}`}
    >
      {children}
    </button>
  );
}
