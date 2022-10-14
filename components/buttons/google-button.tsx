import { MouseEventHandler } from "react";

import Google from "@public/brand-svg/google.svg";
import styles from "@styles/components/buttons/google-button.module.scss";

interface Props {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function GoogleButton({ label, onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.btn}>
      <span className={styles.icon}>
        <Google />
      </span>

      <span className={`${styles.label} -text-body2`}>{label}</span>
    </button>
  );
}

export default GoogleButton;
