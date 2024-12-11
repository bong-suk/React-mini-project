import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import MovieCard from "./MovieCard";
import searchMovies from "../axios";
import "./Search.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) return;

      try {
        const results = await searchMovies(debouncedQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("검색 결과를 가져오는 중 오류 발생:", error);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);

  return (
    <div className="search-container">
      <h2 className="search-title">'{query}' 검색 결과</h2>
      {searchResults.length > 0 ? (
        <div className="search-results">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <p className="no-results">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResults;
