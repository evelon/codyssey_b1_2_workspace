import { useNavigate, useParams } from "react-router";

import { ErrorState } from "../../components/ui/ErrorState";
import { Loading } from "../../components/ui/Loading";
import { useReviewDetail } from "../../hooks/useReviewDetail";
import { EditReviewForm } from "../EditReviewFormPage/EditReviewForm";
import { NotFoundPage } from "../NotFoundPage";

export function EditReviewFormPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { review, loading, error } = useReviewDetail(id ?? "");

  if (!id) {
    return <NotFoundPage />;
  }

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!review) return <ErrorState message="해당하는 리뷰가 없습니다." />;

  const goToDetail = () => {
    navigate(`/reviews/${id}`);
  };

  return (
    <EditReviewForm
      review={review}
      onSuccess={goToDetail}
      onCancel={goToDetail}
    />
  );
}
