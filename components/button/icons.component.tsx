import { MouseEventHandler } from "react";

import styles from "../../styles/components/button/icon.module.css";

interface Props {
  icon: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function IconButton({ icon, onClick, type, disabled }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn}`}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
