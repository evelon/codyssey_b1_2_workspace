import { Card } from "../../components/ui/Card";
import { MoviePoster } from "../../components/ui/MoviePoster";
import { StarDisplay } from "../../components/ui/StarDisplay";
import type { Review } from "../../lib/types";
import styles from "./ReviewCard.module.css";

type ReviewCardProps = {
  review: Review;
  onClick: () => void;
  variant?: "card" | "compact";
};

export function ReviewCard({
  review,
  onClick,
  variant = "card",
}: ReviewCardProps) {
  if (variant === "compact") {
    return (
      <button type="button" className={styles.compactButton} onClick={onClick}>
        <MoviePoster posterUrl={review.posterUrl} title={review.title} size="xs" />
        <span className={styles.compactTitle}>{review.title}</span>
      </button>
    );
  }

  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <Card padding="sm" className={styles.card}>
        <article className={styles.article}>
          <MoviePoster
            posterUrl={review.posterUrl}
            title={review.title}
            size="sm"
          />
          <h3 className={styles.title}>{review.title}</h3>
          {review.rating !== null && (
            <StarDisplay value={review.rating} size="sm" />
          )}
        </article>
      </Card>
    </button>
  );
}
