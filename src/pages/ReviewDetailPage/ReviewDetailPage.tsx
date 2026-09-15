import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "../../components/ui/Button";
import { ErrorState } from "../../components/ui/ErrorState";
import { Loading } from "../../components/ui/Loading";
import { MoviePoster } from "../../components/ui/MoviePoster";
import { StarDisplay } from "../../components/ui/StarDisplay";
import { useReviewDetail } from "../../hooks/useReviewDetail";
import { supabase } from "../../lib/supabase";
import styles from "./ReviewDetailPage.module.css";

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
    <article className={styles.page}>
      <div className={styles.hero}>
        <MoviePoster
          posterUrl={review.posterUrl}
          title={review.title}
          size="lg"
        />
        <div className={styles.info}>
          <h2 className={styles.title}>{review.title}</h2>
          {review.year && <p className={styles.year}>{review.year}</p>}
          <div className={styles.meta}>
            <span>{review.watchedDate}</span>
            {review.rating !== null && <StarDisplay value={review.rating} />}
          </div>
        </div>
      </div>
      {review.reviewText && (
        <p className={styles.reviewText}>{review.reviewText}</p>
      )}
      <div className={styles.actions}>
        <Button onClick={() => navigate(`/reviews/${id}/edit`)}>수정</Button>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm("정말 삭제하시겠습니까?")) handleDelete();
          }}
        >
          삭제
        </Button>
      </div>
      {deleteError && <ErrorState message={deleteError} />}
    </article>
  );
}
