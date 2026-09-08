import { BrowserRouter, Route, Routes } from "react-router";

import Layout from "./components/Layout";
import CalendarPage from "./pages/CalendarPage";
import NotFoundPage from "./pages/NotFoundPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import ReviewFormPage from "./pages/ReviewFormPage";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/reviews/new" element={<ReviewFormPage />} />
          <Route path="/reviews/:id" element={<ReviewDetailPage />} />
          <Route path="/reviews/:id/edit" element={<ReviewFormPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
