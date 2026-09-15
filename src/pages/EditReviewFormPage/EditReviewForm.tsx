import React, { useState } from "react";

import { Button } from "../../components/ui/Button";
import { ErrorState } from "../../components/ui/ErrorState";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { MoviePoster } from "../../components/ui/MoviePoster";
import { StarRating } from "../../components/ui/StarRating";
import { supabase } from "../../lib/supabase";
import type { Review } from "../../lib/types";
import styles from "./EditReviewForm.module.css";

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
  const [rating, setRating] = useState(review.rating);
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
    <div className={styles.page}>
      <figure className={styles.movieSummary}>
        <MoviePoster
          posterUrl={review.posterUrl}
          title={review.title}
          size="md"
        />
        <figcaption className={styles.movieInfo}>
          <span className={styles.movieTitle}>{review.title}</span>
          <span className={styles.movieYear}>({review.year})</span>
        </figcaption>
      </figure>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="영화 본 날짜"
          value={watchedDate}
          onChange={setWatchedDate}
          error={errors.watchedDate}
          type="date"
        />
        <FormField label="별점" error={errors.rating}>
          <StarRating value={rating ?? 0} onChange={setRating} />
        </FormField>
        <Input label="리뷰" value={reviewText} onChange={setReviewText} />
        <div className={styles.actions}>
          <Button type="submit" isLoading={submitting}>
            저장
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
        </div>
      </form>
      {submitError && <ErrorState message={submitError} />}
    </div>
  );
}
