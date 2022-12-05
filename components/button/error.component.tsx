import { MouseEventHandler } from "react";
import styles from "../../styles/components/button/error.module.css";

interface Props {
  children: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant: "primary" | "secondary";
}

export function ErrorButton({ children, onClick, variant }: Props) {
  if (variant == "primary") var variantStyle = styles.btn__primary;
  else if (variant == "secondary") var variantStyle = styles.btn__secondary;
  else variantStyle = "";

  return (
    <button onClick={onClick} className={`${styles.btn} ${variantStyle}`}>
      {children}
    </button>
  );
}
