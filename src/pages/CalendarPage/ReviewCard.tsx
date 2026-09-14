import { Card } from "../../components/ui/Card";
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
          {review.posterUrl ? (
            <img src={review.posterUrl} />
          ) : (
            <div>포스터 없음</div>
          )}
          <h3>{review.title}</h3>
          {review.rating !== null && <StarDisplay value={review.rating} />}
        </article>
      </Card>
    </button>
  );
}
