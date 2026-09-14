import { useState } from "react";
import { useNavigate } from "react-router";

import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { Input } from "../components/ui/Input";
import { Loading } from "../components/ui/Loading";
import { type SearchResult, useMovieSearch } from "../hooks/useMovieSearch";
import { MovieSearchResult } from "./ReviewFormPage/MovieSearchResult";
import { ReviewForm } from "./ReviewFormPage/ReviewForm";

export default function ReviewFormPage() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const { results, loading, error, search } = useMovieSearch();
  const [selectedMovie, setSelectedMovie] = useState<SearchResult | null>(null);

  return selectedMovie ? (
    <ReviewForm
      movie={selectedMovie}
      onCancel={() => setSelectedMovie(null)}
      onSuccess={(id) => {
        navigate(`/reviews/${id}`);
      }}
    />
  ) : (
    <>
      <Input
        label="영화 제목"
        value={keyword}
        onChange={(value) => {
          setKeyword(value);
          search(value);
        }}
      />
      <div>
        {loading && <Loading />}
        {error && <ErrorState message={error} />}
        {!loading && !error && results.length === 0 && keyword && (
          <EmptyState message="검색 결과가 없습니다." />
        )}
        {!loading &&
          !error &&
          results.map((result) => (
            <MovieSearchResult
              key={result.imdbId}
              {...result}
              onSelect={() => setSelectedMovie(result)}
            />
          ))}
      </div>
    </>
  );
}
