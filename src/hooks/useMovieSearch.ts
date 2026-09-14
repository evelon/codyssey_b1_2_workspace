import { useEffect, useState } from "react";

import { omdbApiKey } from "../config/env";

export type SearchResult = {
  posterUrl: string;
  title: string;
  year: string;
  imdbId: string;
};

type UseMovieSearchResult = {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
};

type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type OmdbSearchResponse = {
  Search: OmdbSearchItem[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};

export function useMovieSearch(): UseMovieSearchResult {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);
      fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${omdbApiKey}`,
        { signal: controller.signal },
      )
        .then((res) => res.json())
        .then((data: OmdbSearchResponse) => {
          if (data.Response === "False") {
            setResults([]);
            return;
          }
          setResults(
            data.Search.map((item: OmdbSearchItem) => ({
              title: item.Title,
              year: item.Year,
              posterUrl: item.Poster,
              imdbId: item.imdbID,
            })),
          );
        })
        .catch((error) => {
          if (error.name === "AbortError") return;
          setError(String(error));
        })
        .finally(() => setLoading(false));
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const search = (query: string) => setQuery(query);

  return { results, loading, error, search };
}
