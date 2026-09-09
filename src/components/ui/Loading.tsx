import styles from "./Loading.module.css";
import { Spinner } from "./Spinner";

export function Loading({ message = "불러오는 중..." }: { message?: string }) {
  return (
    <div className={styles.container}>
      <Spinner />
      <p>{message}</p>
    </div>
  );
}
