import React, { useState, useEffect } from 'react';
import { getPopularMovies, getDiscoverMovies } from '../utils/URL.tsx';
import { Movie, searchMovies } from '../utils/api.tsx';
import MovieList from '../components/MovieList.tsx';  // 영화 리스트 컴포넌트
import MovieFilter from '../components/MovieFilter.tsx';  // MovieFilter 컴포넌트 추가
import styles from '../styles/Search.module.css';

const Search: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popularity.desc');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수
  const [hasMore, setHasMore] = useState<boolean>(true); // 인피니티 스크롤에서 더 많은 결과가 있는지 확인

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async () => {
    setLoading(true);
    try {
      let data;

      // 장르 또는 검색어에 따른 데이터 요청
      if (query) {
        data = await searchMovies(query, page, genre, rating, sortBy); // 검색어에 따른 영화 검색
      } else if (genre) {
        data = await getDiscoverMovies(page, genre); // 장르별 영화 요청
      } else {
        data = await getPopularMovies(page); // 인기 영화 요청
      }

      // 결과가 있으면 영화 리스트에 추가
      if (data.results) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
      }

      // 더 이상 결과가 없으면 hasMore를 false로 설정
      if (page >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // 필터 초기화 함수
  const resetFilters = () => {
    setGenre('');
    setRating('');
    setSortBy('popularity.desc');
    setQuery('');
    setPage(1);
    setMovies([]); // 영화 리스트 초기화
    setHasMore(true); // 인피니티 스크롤을 다시 활성화
  };

  // 페이지 변경 시 호출되는 함수
  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // 검색 조건이 변경될 때마다 영화 데이터 새로 가져오기
  useEffect(() => {
    setMovies([]); // 기존 리스트 초기화
    fetchMovies();
  }, [query, genre, rating, sortBy, page]);

  return (
    <div className="search-page">
      <div className={styles.filters}>
        <h2 className={styles.h2}>선호하는 설정을 선택하세요</h2>

        {/* MovieFilter 컴포넌트 사용 */}
        <MovieFilter 
          onLanguageChange={(language) => setQuery(language)} 
          onSortChange={(sort) => setSortBy(sort)} 
          onReset={resetFilters} 
          onGenreChange={(genre) => setGenre(genre)}
          onRatingChange={(rating) => setRating(rating)}
        />
      </div>

      {/* 영화 리스트 표시 */}
      <MovieList movies={movies} />

      {/* 로딩 중 표시 */}
      {loading && <p>로딩 중...</p>}

      {/* 인피니티 스크롤 처리 */}
      {hasMore && !loading && (
        <button onClick={loadMoreMovies} className="load-more-btn">
          더 보기
        </button>
      )}
    </div>
  );
};

export default Search;
