import { MouseEventHandler, ReactElement } from "react";

import styles from "@styles/components/buttons/icon-button.module.scss";

interface Props {
  icon: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function IconButton({ icon, onClick, type, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={styles.btn}
    >
      <span>{icon}</span>
    </button>
  );
}

export default IconButton;
