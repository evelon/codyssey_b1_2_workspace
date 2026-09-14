import { BrowserRouter, Route, Routes } from "react-router";

import { Layout } from "./components/Layout";
import { CalendarPage } from "./pages/CalendarPage/CalendarPage";
import { CreateReviewFormPage } from "./pages/CreateReviewFormPage/CreateReviewFormPage";
import { EditReviewFormPage } from "./pages/EditReviewFormPage/EditReviewFormPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ReviewDetailPage } from "./pages/ReviewDetailPage/ReviewDetailPage";
import { StatsPage } from "./pages/StatsPage/StatsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/reviews/new" element={<CreateReviewFormPage />} />
          <Route path="/reviews/:id" element={<ReviewDetailPage />} />
          <Route path="/reviews/:id/edit" element={<EditReviewFormPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
