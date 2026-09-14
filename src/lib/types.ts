export type Review = {
  id: string;
  watchedDate: string;
  imdbId: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  reviewText: string | null;
  createdAt: string;
};
