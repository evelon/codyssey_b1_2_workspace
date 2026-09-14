import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router";

import { ErrorState } from "../components/ui/ErrorState";
import { Loading } from "../components/ui/Loading";
import { useReviews } from "../hooks/useReviews";
import type { Review } from "../lib/types";
import styles from "./CalendarPage.module.css";
import { ReviewCard } from "./CalendarPage/ReviewCard";

function groupReviewByDate(reviews: Review[]): Record<string, Review[]> {
  const grouped: Record<string, Review[]> = {};

  for (const review of reviews) {
    const key = review.watchedDate;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(review);
  }

  return grouped;
}

export function CalendarPage() {
  const navigate = useNavigate();
  const { reviews, loading, error } = useReviews();
  const [currentDate] = useState(() => new Date());

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const groupedReview = groupReviewByDate(reviews);

  return (
    <ul className={styles.calendar}>
      {days.map((day) => {
        const dayKey = format(day, "yyyy-MM-dd");
        const reviewsOnThisDay = groupedReview[dayKey] ?? [];
        return (
          <li key={dayKey} data-outside-month={!isSameMonth(day, currentDate)}>
            <span>{format(day, "d")}</span>
            {reviewsOnThisDay.map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onClick={() => navigate(`/reviews/${review.id}`)}
                />
              );
            })}
          </li>
        );
      })}
    </ul>
  );
}
