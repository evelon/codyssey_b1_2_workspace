import styles from "./StarDisplay.module.css";
type StarDisplayProps = {
  value: number;
  size?: "sm" | "md";
};

export function StarDisplay({ value, size = "md" }: StarDisplayProps) {
  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={styles.star}
          data-size={size}
          data-filled={star <= value}
          aria-label={`${star}점`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
