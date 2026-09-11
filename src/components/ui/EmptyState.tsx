import { IconMoodEmpty } from "@tabler/icons-react";

import styles from "./EmptyState.module.css";

export function EmptyState({
  message = "표시할 데이터가 없습니다.",
}: {
  message?: string;
}) {
  return (
    <div className={styles.container}>
      <IconMoodEmpty size={20} />
      <p>{message}</p>
    </div>
  );
}
