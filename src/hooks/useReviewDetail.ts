import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import type { Review } from "../lib/types";

type UseReviewDetailResult = {
  review: Review | null;
  loading: boolean;
  error: string | null;
};

export function useReviewDetail(id: string): UseReviewDetailResult {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReview() {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("movie_reviews")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setReview(null);
        setLoading(false);
        setError(error.message);
        return;
      }

      const review: Review = {
        id: data.id,
        watchedDate: data.watched_date,
        imdbId: data.imdb_id,
        title: data.title,
        posterUrl: data.poster_url,
        rating: data.rating,
        reviewText: data.review_text,
        createdAt: data.created_at,
      };

      setReview(review);
      setLoading(false);
      setError(null);
    }
    fetchReview();
  }, [id]);

  return {
    review,
    loading,
    error,
  };
}
