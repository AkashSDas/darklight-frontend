import { MouseEventHandler } from "react";
import styles from "../../styles/components/button/index.module.css";

interface Props {
  children: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant: "text" | "contained";
}

function Button({ children, onClick, variant }: Props) {
  if (variant == "text") var variantStyle = styles.btn__text;
  else if (variant == "contained") var variantStyle = styles.btn__contained;
  else variantStyle = "";

  return (
    <button onClick={onClick} className={`${styles.btn} ${variantStyle}`}>
      {children}
    </button>
  );
}

export default Button;
