import { Card } from "../../components/ui/Card";
import { MoviePoster } from "../../components/ui/MoviePoster";
import styles from "./MovieSearchResult.module.css";

type MovieSearchResultProps = {
  title: string;
  year: string;
  posterUrl: string;
  onSelect: () => void;
};

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
          <MoviePoster posterUrl={posterUrl} title={title} size="sm" />
          <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.year}>({year})</span>
          </div>
        </div>
      </Card>
    </button>
  );
}
