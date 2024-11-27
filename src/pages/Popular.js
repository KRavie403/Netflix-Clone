import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api';
import styles from '../styles/Popular.module.css';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [topVisible, setTopVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  // 영화 데이터 로드 함수
  const fetchMovies = async (page = currentPage) => {
    if (scrolling) return; // 스크롤 중이면 중복 요청을 막음
    setLoading(true);
    setScrolling(true);
    try {
      const data = await getPopularMovies(page);
      if (data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setCurrentPage(page);
        setHasMore(page < data.total_pages); // 페이지가 더 있는지 체크
      }
    } catch (error) {
      console.error('Failed to fetch popular movies:', error);
    } finally {
      setLoading(false);
      setScrolling(false);
    }
  };

  // 스크롤 끝에 도달하면 다음 페이지 로드
  const handleScroll = () => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom && hasMore && !loading) {
      setScrolling(true);
      fetchMovies(currentPage + 1); // 다음 페이지 데이터를 요청
    }

    // '맨 위로 가기' 버튼 표시
    if (window.scrollY > 200) {
      setTopVisible(true);
    } else {
      setTopVisible(false);
    }
  };

  // 페이지 네비게이션 처리
  const handlePagination = (direction) => {
    if (direction === 'next' && hasMore) {
      fetchMovies(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      fetchMovies(currentPage - 1);
    }
  };

  // '맨 위로 가기' 버튼 클릭
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 영화 상세 정보 가져오기
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`);
      const data = await response.json();
      setMovieDetails(data);
      setSelectedMovie(movieId); // 현재 선택된 영화 설정
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  // 첫 로드 시 영화 데이터 요청
  useEffect(() => {
    fetchMovies(1); // 첫 번째 페이지 데이터 요청
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, loading, scrolling, hasMore]);

  if (loading && currentPage === 1) return <p>Loading movies...</p>;

  // 영화 상세 팝업이 열려 있을 때
  const closeMovieDetails = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  return (
    <div className={styles.container}>
      <h2>기다림이 아깝지 않은 콘텐츠</h2>

      {/* View Mode Toggle */}
      <div className={styles.viewModeToggle}>
        <button
          className={viewMode === 'table' ? styles.activeViewMode : ''}
          onClick={() => setViewMode('table')}
        >
          테이블 뷰
        </button>
        <button
          className={viewMode === 'infinite' ? styles.activeViewMode : ''}
          onClick={() => setViewMode('infinite')}
        >
          무한 스크롤
        </button>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className={styles.tableView}>
          <table className={styles.movieTable}>
            <thead>
              <tr>
                <th>포스터</th>
                <th>제목</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt={movie.title}
                      onClick={() => fetchMovieDetails(movie.id)} // 클릭하면 상세 정보 로드
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>
                    <button onClick={() => fetchMovieDetails(movie.id)}>자세히</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
              이전
            </button>
            <span>{currentPage}</span>
            <button onClick={() => handlePagination('next')} disabled={!hasMore}>
              다음
            </button>
          </div>
        </div>
      )}

      {/* Infinite Scroll View */}
      {viewMode === 'infinite' && (
        <div className={styles.infiniteScroll}>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id} className={styles.movieItem}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  onClick={() => fetchMovieDetails(movie.id)} // 클릭하면 상세 정보 로드
                />
                <h3>{movie.title}</h3>
              </li>
            ))}
          </ul>

          {loading && <p>Loading more...</p>}
        </div>
      )}

      {/* 영화 상세 팝업 */}
      {selectedMovie && movieDetails && (
        <div className={styles.movieModal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeMovieDetails}>X</button>
            <img
              src={`https://image.tmdb.org/t/p/w400/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className={styles.modalPoster}
            />
            <div className={styles.modalInfo}>
              <h3>{movieDetails.title}</h3>
              <p>평점: {movieDetails.vote_average}</p>
              <p>방영일: {movieDetails.release_date}</p>
              <p><strong>출연진:</strong> {movieDetails.cast?.join(', ')}</p>
              <p><strong>장르:</strong> {movieDetails.genres?.map(genre => genre.name).join(', ')}</p>
              <p><strong>설명:</strong> {movieDetails.overview}</p>
            </div>
          </div>
        </div>
      )}

      {/* "맨 위로 가기" 버튼 */}
      {topVisible && (
        <button className={styles.topButton} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Popular;
