import { NavLink, Outlet } from "react-router";

import styles from "./Layout.module.css";

const navItems = [
  { to: "/", label: "캘린더", end: true },
  { to: "/reviews/new", label: "리뷰 작성", end: false },
  { to: "/stats", label: "통계", end: false },
];

export function Layout() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.brand}>
            🎬 무비로그
          </NavLink>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
