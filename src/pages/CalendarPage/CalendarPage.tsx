import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "../../components/ui/Button";
import { ErrorState } from "../../components/ui/ErrorState";
import { Loading } from "../../components/ui/Loading";
import { useReviews } from "../../hooks/useReviews";
import type { Review } from "../../lib/types";
import styles from "./CalendarPage.module.css";
import { ReviewCard } from "./ReviewCard";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

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
  const [currentDate, setCurrentDate] = useState(() => new Date());

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const groupedReview = groupReviewByDate(reviews);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button
          variant="secondary"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          이전 달
        </Button>
        <h2 className={styles.monthLabel}>
          {format(currentDate, "yyyy년 M월")}
        </h2>
        <Button
          variant="secondary"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        >
          다음 달
        </Button>
      </div>
      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <span key={day} className={styles.weekday}>
            {day}
          </span>
        ))}
      </div>
      <ul className={styles.calendar}>
        {days.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const reviewsOnThisDay = groupedReview[dayKey] ?? [];
          return (
            <li
              key={dayKey}
              className={styles.day}
              data-outside-month={!isSameMonth(day, currentDate)}
            >
              <span className={styles.dayNumber} data-today={isToday(day)}>
                {format(day, "d")}
              </span>
              <div className={styles.reviews}>
                {reviewsOnThisDay.map((review) => {
                  return (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      variant="compact"
                      onClick={() => navigate(`/reviews/${review.id}`)}
                    />
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
