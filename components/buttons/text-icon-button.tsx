import { MouseEventHandler, ReactElement } from "react";

import styles from "@styles/components/buttons/text-icon-button.module.scss";

interface Props {
  icon: ReactElement;
  size: "sm" | "md" | "lg";
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function TextIconButton({ icon, size, label, onClick, type, disabled }: Props) {
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
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default TextIconButton;
