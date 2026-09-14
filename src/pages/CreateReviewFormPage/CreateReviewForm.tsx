import React, { useState } from "react";

import { Button } from "../../components/ui/Button";
import { ErrorState } from "../../components/ui/ErrorState";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { StarRating } from "../../components/ui/StarRating";
import { type SearchResult } from "../../hooks/useMovieSearch";
import { supabase } from "../../lib/supabase";

type ReviewFormProps = {
  movie: SearchResult;
  onCancel: () => void;
  onSuccess: (id: string) => void;
};

export function CreateReviewForm({
  movie,
  onCancel,
  onSuccess,
}: ReviewFormProps) {
  const [watchedDate, setWatchedDate] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
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
      .insert({
        watched_date: watchedDate,
        imdb_id: movie.imdbId,
        title: movie.title,
        poster_url: movie.posterUrl,
        rating: Number(rating),
        review_text: reviewText,
      })
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
        <img src={movie.posterUrl} alt={movie.title} />
        <figcaption>
          <span>{movie.title}</span>
          <span>({movie.year})</span>
        </figcaption>
      </figure>
      <form onSubmit={handleSubmit}>
        <Input
          label="영화 본 날짜"
          value={watchedDate}
          onChange={setWatchedDate}
          error={errors.watchedDate}
          type="date"
        />
        <FormField label="별점">
          <StarRating value={0} onChange={setRating} />
        </FormField>
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
