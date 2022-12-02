import styles from "../../styles/components/badges/text.module.css";

interface Props {
  children: string;
  variant: "highlight" | "regular";
}

export function TextBadge({ children, variant }: Props) {
  if (variant == "highlight") var variantStyle = styles.badge__highlight;
  else var variantStyle = styles.badge__regular;
  return <span className={`${styles.badge} ${variantStyle}`}>{children}</span>;
}
