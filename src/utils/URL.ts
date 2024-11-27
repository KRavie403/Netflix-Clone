import axios from 'axios';

// 공통 매개변수
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const language = 'ko-KR';

// TMDb API의 기본 URL
const BASE_URL = 'https://api.themoviedb.org/3';

// 주요 API 엔드포인트
const getMoviesUrl = (endpoint: string, page: number = 1) => {
  return `${BASE_URL}${endpoint}?api_key=${apiKey}&language=${language}&page=${page}`;
};

// 데이터 요청 함수
export const fetchMovies = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

// 예시: 인기 영화 목록을 가져오는 함수
export const getPopularMovies = (page: number) => fetchMovies(getMoviesUrl('/movie/popular', page));
export const getNowPlayingMovies = (page: number) => fetchMovies(getMoviesUrl('/movie/now_playing', page));
export const getTopRatedMovies = (page: number) => fetchMovies(getMoviesUrl('/movie/top_rated', page));
export const getUpcomingMovies = (page: number) => fetchMovies(getMoviesUrl('/movie/upcoming', page));
