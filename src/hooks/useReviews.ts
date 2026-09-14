import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import type { Review } from "../lib/types";

type UseReviewsResult = {
  reviews: Review[];
  loading: boolean;
  error: string | null;
};

export function useReviews(): UseReviewsResult {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.from("movie_reviews").select("*");

      if (error) {
        setReviews([]);
        setLoading(false);
        setError(error.message);
        return;
      }

      setReviews(
        data.map((item) => {
          return {
            id: item.id,
            watchedDate: item.watched_date,
            imdbId: item.imdb_id,
            title: item.title,
            posterUrl: item.poster_url,
            rating: item.rating,
            reviewText: item.review_text,
            createdAt: item.created_at,
            year: item.year,
          };
        }),
      );
      setLoading(false);
    }
    fetchReviews();
  }, []);
  return { reviews, loading, error };
}
