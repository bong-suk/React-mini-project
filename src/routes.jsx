import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { getMovieList } from "./axios";
import SearchResults from "./components/Search";

const AppRoutes = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const data = await getMovieList();
        setMovieList(data);
      } catch (error) {
        console.error("영화 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchMovieList();
  }, []);

  const filteredMovieList = movieList.filter((movie) => !movie.adult);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <main>
              {filteredMovieList.map((item) => {
                return <MovieCard key={item.id} {...item} />;
              })}
            </main>
          }
        />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
