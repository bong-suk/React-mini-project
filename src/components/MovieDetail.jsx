import { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../axios";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovieDetail(data);
      } catch (error) {
        console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="movie-detail">
      {movieDetail && (
        <>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
          ></img>
          <div className="movie-info">
            <div className="movie-header">
              <p className="movie-title">{movieDetail.title}</p>
              <p className="movie-rating">⭐{movieDetail.vote_average}</p>
            </div>
            <p className="movie-genres">
              {movieDetail.genres.map((genre) => {
                return (
                  <span className="movie-genre" key={genre.id}>
                    {genre.name}
                  </span>
                );
              })}
            </p>
            <p className="movie-overview">{movieDetail.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};
export default MovieDetail;
