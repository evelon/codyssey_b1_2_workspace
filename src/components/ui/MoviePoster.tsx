import { useState } from "react";

type MoviePosterProps = {
  posterUrl: string | null;
  title: string;
};

export function MoviePoster({ posterUrl, title }: MoviePosterProps) {
  const [imageError, setImageError] = useState(false);

  const isValid = posterUrl && posterUrl !== "N/A" && !imageError;

  return isValid ? (
    <img src={posterUrl} alt={title} onError={() => setImageError(true)} />
  ) : (
    <div>포스터 없음</div>
  );
}
