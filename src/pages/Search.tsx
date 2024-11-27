import React, { useState, useEffect } from 'react';
import { getPopularMovies, getDiscoverMovies } from '../utils/URL.tsx';
import { Movie, searchMovies } from '../utils/api.tsx';
import MovieList from '../components/MovieList.tsx';  // 영화 리스트 컴포넌트

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
      <div className="filters">
        <h2>영화 필터링</h2>

        {/* 검색창 */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 검색..."
        />
        
        {/* 장르 필터 */}
        <select onChange={(e) => setGenre(e.target.value)} value={genre}>
          <option value="">장르 선택</option>
          <option value="28">액션</option>
          <option value="12">모험</option>
          <option value="16">애니메이션</option>
          <option value="35">코미디</option>
          <option value="80">범죄</option>
          <option value="99">다큐멘터리</option>
          <option value="18">드라마</option>
          <option value="10751">가족</option>
          {/* 다른 장르들 추가 가능 */}
        </select>

        {/* 평점 필터 */}
        <select onChange={(e) => setRating(e.target.value)} value={rating}>
          <option value="">평점 필터</option>
          <option value="7">7 이상</option>
          <option value="8">8 이상</option>
          <option value="9">9 이상</option>
        </select>

        {/* 정렬 옵션 */}
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">개봉일순</option>
          <option value="vote_average.desc">평점순</option>
          {/* 다른 정렬 기준 추가 가능 */}
        </select>

        {/* 초기화 버튼 */}
        <button onClick={resetFilters}>초기화</button>
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
