import styles from "./Spinner.module.css";

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return <div className={styles.spinner} data-size={size}></div>;
}
