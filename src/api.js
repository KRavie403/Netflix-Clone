import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

export const getPopularMovies = async () => {
    try {
      const response = await tmdbApi.get('/movie/popular');
      return response.data.results; // 영화 데이터 리스트 반환
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
};

export default tmdbApi;
