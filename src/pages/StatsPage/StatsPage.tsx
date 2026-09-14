import { useNavigate } from "react-router";

import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { Loading } from "../../components/ui/Loading";
import { useReviews } from "../../hooks/useReviews";
import { ReviewCard } from "../CalendarPage/ReviewCard";

export function StatsPage() {
  const navigate = useNavigate();
  const { reviews, loading, error } = useReviews();

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  const totalCount = reviews.length;
  if (totalCount === 0) return <EmptyState message="기록한 영화가 없습니다." />;
  const ratedReviews = reviews.filter((review) => review.rating !== null);
  const averageRating =
    ratedReviews.length !== 0
      ? ratedReviews.reduce((acc, review) => {
          return acc + (review.rating ?? 0);
        }, 0) / ratedReviews.length
      : null;

  const sortedReviews = [...reviews].sort((a, b) =>
    b.watchedDate.localeCompare(a.watchedDate),
  );
  const mostRecent = sortedReviews.length === 0 ? null : sortedReviews[0];

  return (
    <div>
      <p>총 {totalCount} 개의 영화를 봤습니다.</p>
      {averageRating !== null && <p>평균 평점: {averageRating.toFixed(1)}</p>}
      {mostRecent !== null && (
        <div>
          가장 최근에 본 영화:{" "}
          <ReviewCard
            review={mostRecent}
            onClick={() => navigate(`/reviews/${mostRecent.id}`)}
          />
        </div>
      )}
    </div>
  );
}
