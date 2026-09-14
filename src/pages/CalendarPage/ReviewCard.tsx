import { Card } from "../../components/ui/Card";
import { MoviePoster } from "../../components/ui/MoviePoster";
import { StarDisplay } from "../../components/ui/StarDisplay";
import type { Review } from "../../lib/types";

type ReviewCardProps = {
  review: Review;
  onClick: () => void;
};

export function ReviewCard({ review, onClick }: ReviewCardProps) {
  return (
    <button type="button" onClick={onClick}>
      <Card padding="sm">
        <article>
          <MoviePoster posterUrl={review.posterUrl} title={review.title} />
          <h3>{review.title}</h3>
          {review.rating !== null && <StarDisplay value={review.rating} />}
        </article>
      </Card>
    </button>
  );
}
