// /utils/tmdbAPI.ts
import axios, { AxiosResponse } from 'axios';

// TMDb API 키와 기본 URL
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Axios 인스턴스 생성
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

// TMDb API에서 받아오는 영화 데이터를 위한 타입 정의
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

// 인기 영화 데이터의 응답 형태 정의
interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// 영화 검색 및 필터링을 위한 타입 정의
interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// 인기 영화 가져오는 함수
export const getPopularMovies = async (page: number = 1): Promise<PopularMoviesResponse> => {
  try {
    const response: AxiosResponse<PopularMoviesResponse> = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// 영화 검색 함수 (필터링 및 정렬 추가)
export const searchMovies = async (
  query: string, 
  page: number = 1, 
  genre?: string, 
  rating?: string, 
  sortBy?: string
): Promise<MovieSearchResponse> => {
  try {
    const response: AxiosResponse<MovieSearchResponse> = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
        with_genres: genre,
        vote_average: rating ? `gte:${rating}` : undefined,
        sort_by: sortBy || 'popularity.desc',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export default tmdbApi;
