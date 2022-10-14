import { MouseEventHandler } from "react";

import styles from "@styles/components/buttons/flat-button.module.scss";

interface Props {
  size: "sm" | "md" | "lg";
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function FlatButton({ size, label, onClick, type, disabled }: Props) {
  if (size == "sm") {
    var sizeClass = `${styles.sm} -text-body2`;
  } else if (size == "lg") {
    var sizeClass = `${styles.lg} -text-body1`;
  }

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${sizeClass}`}
    >
      {label}
    </button>
  );
}

export default FlatButton;
