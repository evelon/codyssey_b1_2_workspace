import styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
};

export function Card({ children, padding = "md" }: CardProps) {
  return (
    <div className={styles.card} data-padding={padding}>
      {children}
    </div>
  );
}
