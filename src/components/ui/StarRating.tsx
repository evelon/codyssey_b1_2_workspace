import { useState } from "react";

import styles from "./StarRating.module.css";
type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
};

export function StarRating({ value, onChange }: StarRatingProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const displayValue = hoveredValue ?? value;

  return (
    <div
      className={styles.container}
      onMouseLeave={() => setHoveredValue(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => {
            onChange(star);
          }}
          onMouseEnter={() => {
            setHoveredValue(star);
          }}
          className={styles.star}
          data-filled={star <= displayValue}
          aria-label={`${star}점`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
