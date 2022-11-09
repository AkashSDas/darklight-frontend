import ReactMarkdown from "react-markdown";

import styles from "@styles/components/shared/markdown.module.scss";

export default function Markdown({ children }) {
  return <ReactMarkdown className={styles.md}>{children}</ReactMarkdown>;
}
