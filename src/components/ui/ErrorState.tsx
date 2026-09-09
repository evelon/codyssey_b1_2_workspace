import styles from "./ErrorState.module.css";
export function ErrorState({
  message = "요청에 실패했습니다. 다시 시도하세요",
}: {
  message?: string;
}) {
  return (
    <div className={styles.container}>
      <p>{message}</p>
    </div>
  );
}
