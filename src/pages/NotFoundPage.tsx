import { Link } from "react-router";

import { ErrorState } from "../components/ui/ErrorState";

export function NotFoundPage() {
  return (
    <>
      <ErrorState message="존재하지 않는 페이지입니다." />
      <Link to="/">홈으로 돌아가기</Link>
    </>
  );
}
