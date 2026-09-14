import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">캘린더</Link>
          <Link to="/reviews/new">리뷰 작성</Link>
          <Link to="/stats">통계</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
