import { Card } from "../../components/ui/Card";
import styles from "./MovieSearcResult.module.css";

type MovieSearchResultProps = {
  title: string;
  year: string;
  posterUrl: string;
  onSelect: () => void;
};

function hasValidPoster(posterUrl: string) {
  return posterUrl && posterUrl !== "N/A";
}

export function MovieSearchResult({
  title,
  year,
  posterUrl,
  onSelect,
}: MovieSearchResultProps) {
  return (
    <button className={styles.button} onClick={onSelect}>
      <Card padding="lg">
        <div className={styles.content}>
          {hasValidPoster(posterUrl) ? (
            <img
              className={styles.poster}
              src={posterUrl}
              alt={title}
              loading="lazy"
            />
          ) : (
            <div className={styles.posterPlaceholder}>포스터 없음</div>
          )}
          <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.year}>({year})</span>
          </div>
        </div>
      </Card>
    </button>
  );
}
