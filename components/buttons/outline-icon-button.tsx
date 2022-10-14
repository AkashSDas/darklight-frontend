import { MouseEventHandler, ReactElement } from "react";

import styles from "@styles/components/buttons/outline-icon-button.module.scss";

interface Props {
  icon: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function OutlineIconButton({ icon, onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.btn}>
      {icon}
    </button>
  );
}

export default OutlineIconButton;
