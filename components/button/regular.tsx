import { MouseEventHandler } from "react";

import styles from "../../styles/components/button/regular.module.css";

interface Props {
  children: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant: "text" | "contained";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function RegularButton({
  children,
  onClick,
  variant,
  type,
  disabled,
}: Props) {
  if (variant == "text") var variantStyle = styles.btn__text;
  else if (variant == "contained") var variantStyle = styles.btn__contained;
  else variantStyle = "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${variantStyle}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
