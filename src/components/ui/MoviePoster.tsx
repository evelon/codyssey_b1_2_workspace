import { useState } from "react";

import styles from "./MoviePoster.module.css";

type MoviePosterProps = {
  posterUrl: string | null;
  title: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export function MoviePoster({
  posterUrl,
  title,
  size = "md",
}: MoviePosterProps) {
  const [imageError, setImageError] = useState(false);

  const isValid = posterUrl && posterUrl !== "N/A" && !imageError;

  return isValid ? (
    <img
      className={styles.poster}
      data-size={size}
      src={posterUrl}
      alt={title}
      onError={() => setImageError(true)}
    />
  ) : (
    <div className={styles.placeholder} data-size={size}>
      포스터 없음
    </div>
  );
}
