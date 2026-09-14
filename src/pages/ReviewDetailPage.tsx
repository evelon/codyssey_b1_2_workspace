import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "../components/ui/Button";
import { ErrorState } from "../components/ui/ErrorState";
import { Loading } from "../components/ui/Loading";
import { StarDisplay } from "../components/ui/StarDisplay";
import { useReviewDetail } from "../hooks/useReviewDetail";
import { supabase } from "../lib/supabase";

export function ReviewDetailPage() {
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { review, loading, error } = useReviewDetail(id ?? "");

  if (!id) {
    return <ErrorState message="잘못된 접근입니다." />;
  }
  const reviewId = id;

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!review) return <ErrorState message="리뷰를 찾을 수 없습니다." />;

  async function handleDelete() {
    const { error } = await supabase
      .from("movie_reviews")
      .delete()
      .eq("id", reviewId);
    if (error) {
      setDeleteError(error.message);
      return;
    }
    navigate("/");
  }

  return (
    <article>
      {review.posterUrl ? (
        <img src={review.posterUrl} alt={review.title} />
      ) : (
        <div>포스터 없음</div>
      )}
      <h2>{review.title}</h2>
      <p>year</p>
      <p>
        {review.watchedDate}{" "}
        {review.rating && <StarDisplay value={review.rating} />}
      </p>
      {review.reviewText && <p>{review.reviewText}</p>}
      <Button onClick={() => navigate(`/reviews/${id}/edit`)}>수정</Button>
      <Button
        variant="danger"
        onClick={() => {
          if (confirm("정말 삭제하시겠습니까?")) handleDelete();
        }}
      >
        삭제
      </Button>
      {deleteError && <ErrorState message={deleteError} />}
    </article>
  );
}
