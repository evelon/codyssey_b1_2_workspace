import styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  className?: string;
};

export function Card({ children, padding = "md", className }: CardProps) {
  return (
    <div
      className={className ? `${styles.card} ${className}` : styles.card}
      data-padding={padding}
    >
      {children}
    </div>
  );
}
