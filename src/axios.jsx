import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const filterMovies = (movies) => {
  return movies
    .filter((movie) => !movie.adult)
    .map((movie) => ({
      ...movie,
      vote_average: movie.vote_average.toFixed(1),
    }));
};

export const getMovieList = async () => {
  try {
    const response = await instance.get(
      `/movie/popular?api_key=${apiKey}&language=ko-KR`
    );
    const filteredMovieList = filterMovies(response.data.results);
    return filteredMovieList;
  } catch (error) {
    console.error("영화 목록을 가져오는 중 오류 발생:", error);
    throw new Error("영화 목록을 가져오는 데 실패했습니다.");
  }
};

export const getMovieDetail = async (id) => {
  try {
    const response = await instance.get(
      `/movie/${id}?api_key=${apiKey}&language=ko-KR`
    );
    const movie = {
      ...response.data,
      vote_average: response.data.vote_average.toFixed(1),
    };
    return movie;
  } catch (error) {
    console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
    throw new Error(
      "영화 상세 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

export default async function searchMovies(searchTerm) {
  try {
    const response = await instance.get(
      `/search/movie?api_key=${apiKey}&query=${searchTerm}`
    );
    const filteredMovieList = filterMovies(response.data.results);
    return filteredMovieList;
  } catch (error) {
    console.error("영화 검색 중 오류 발생:", error);
    throw new Error("영화 검색에 실패했습니다.");
  }
}
