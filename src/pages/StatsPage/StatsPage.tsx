import { useNavigate } from "react-router";

import { Card } from "../../components/ui/Card";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { Loading } from "../../components/ui/Loading";
import { useReviews } from "../../hooks/useReviews";
import { ReviewCard } from "../CalendarPage/ReviewCard";
import styles from "./StatsPage.module.css";

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
    <div className={styles.page}>
      <h2 className={styles.heading}>통계</h2>
      <div className={styles.statGrid}>
        <Card className={styles.statCard}>
          <span className={styles.statLabel}>총 관람 영화</span>
          <span className={styles.statValue}>{totalCount}편</span>
        </Card>
        {averageRating !== null && (
          <Card className={styles.statCard}>
            <span className={styles.statLabel}>평균 평점</span>
            <span className={styles.statValue}>
              {averageRating.toFixed(1)}점
            </span>
          </Card>
        )}
      </div>
      {mostRecent !== null && (
        <div className={styles.recent}>
          <h3 className={styles.subheading}>가장 최근에 본 영화</h3>
          <div className={styles.recentCard}>
            <ReviewCard
              review={mostRecent}
              onClick={() => navigate(`/reviews/${mostRecent.id}`)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
