import React, { useState } from "react";

import { Button } from "../../components/ui/Button";
import { ErrorState } from "../../components/ui/ErrorState";
import { Input } from "../../components/ui/Input";
import { supabase } from "../../lib/supabase";
import type { Review } from "../../lib/types";

type ReviewFormProps = {
  review: Review;
  onCancel: () => void;
  onSuccess: (id: string) => void;
};

export function EditReviewForm({
  review,
  onCancel,
  onSuccess,
}: ReviewFormProps) {
  const [watchedDate, setWatchedDate] = useState<string>(review.watchedDate);
  const [rating, setRating] = useState(String(review.rating ?? ""));
  const [reviewText, setReviewText] = useState(review.reviewText ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    watchedDate?: string;
    rating?: string;
  }>({});

  function validate() {
    const newErrors: typeof errors = {};
    if (!watchedDate) newErrors.watchedDate = "날짜를 입력하세요";
    if (!rating) newErrors.rating = "별점을 입력하세요";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const { data, error } = await supabase
      .from("movie_reviews")
      .update({
        watched_date: watchedDate,
        rating: Number(rating),
        review_text: reviewText,
      })
      .eq("id", review.id)
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      setSubmitError(error.message);
      return;
    }
    onSuccess(data.id);
  }

  return (
    <div>
      <figure>
        {review.posterUrl ? (
          <img src={review.posterUrl} alt={review.title} />
        ) : (
          <div>포스터 없음</div>
        )}
        <figcaption>
          <span>{review.title}</span>
          <span>({review.year})</span>
        </figcaption>
      </figure>
      <form onSubmit={handleSubmit}>
        <Input
          label="영화 본 날짜"
          value={watchedDate}
          onChange={setWatchedDate}
          error={errors.watchedDate}
        />
        <Input
          label="별점"
          value={rating}
          onChange={setRating}
          type="number"
          error={errors.rating}
        />
        <Input label="리뷰" value={reviewText} onChange={setReviewText} />
        <Button type="submit" isLoading={submitting}>
          저장
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
      </form>
      {submitError && <ErrorState message={submitError} />}
    </div>
  );
}
