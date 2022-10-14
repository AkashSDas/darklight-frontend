import { MouseEventHandler } from "react";

import styles from "@styles/components/buttons/outline-button.module.scss";

interface Props {
  size: "sm" | "md" | "lg";
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function OutlineButton({ size, label, onClick }: Props) {
  if (size == "sm") {
    var sizeClass = styles.sm;
  }

  return (
    <button onClick={onClick} className={`${styles.btn} ${sizeClass}`}>
      {label}
    </button>
  );
}

export default OutlineButton;
