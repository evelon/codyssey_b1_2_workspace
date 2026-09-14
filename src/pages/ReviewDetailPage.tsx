import { useParams } from "react-router";

import { ErrorState } from "../components/ui/ErrorState";
import { Loading } from "../components/ui/Loading";
import { useReviewDetail } from "../hooks/useReviewDetail";

export default function ReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { review, loading, error } = useReviewDetail(id ?? "");

  if (!id) {
    return <ErrorState message="잘못된 접근입니다." />;
  }

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!review) return <ErrorState message="리뷰를 찾을 수 없습니다." />;

  return (
    <article>
      {review.posterUrl ? (
        <img src={review.posterUrl} alt={review.title} />
      ) : (
        <div>포스터 없음</div>
      )}
      <h2>{review.title}</h2>
      <p>
        {review.watchedDate} {review.rating && `. ⭐️ ${review.rating}`}
      </p>
      {review.reviewText && <p>{review.reviewText}</p>}
    </article>
  );
}
