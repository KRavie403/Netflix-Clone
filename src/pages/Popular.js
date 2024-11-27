import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api';
import styles from '../styles/Popular.module.css'; // 스타일 파일을 추가하여 디자인을 개선할 수 있습니다.

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // table 또는 infinite로 전환
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 무한 스크롤이 더 이상 데이터가 없는지 확인
  const [topVisible, setTopVisible] = useState(false); // "맨 위로 가기" 버튼의 visibility 상태
  const [scrolling, setScrolling] = useState(false); // 스크롤 상태 (로딩 중인지 여부)

  // 영화 데이터 로드
  const fetchMovies = async (page = currentPage) => {
    if (scrolling) return; // 스크롤이 진행 중일 때는 중복 요청을 막음
    setLoading(true);
    try {
      const moviesData = await getPopularMovies(page);
      if (moviesData.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...moviesData.results]);
        setCurrentPage(page);
        setHasMore(moviesData.page < moviesData.total_pages); // 더 많은 데이터가 있는지 확인
      }
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
    } finally {
      setLoading(false);
      setScrolling(false);
    }
  };

  // 페이지 첫 로드
  useEffect(() => {
    fetchMovies(1); // 첫 번째 페이지 영화 데이터 로드
  }, []);

  // 스크롤 끝에 도달했을 때, 다음 페이지 로드
  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && hasMore && !loading) {
      setScrolling(true);
      fetchMovies(currentPage + 1);
    }
    // "맨 위로 가기" 버튼 표시
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

  // "맨 위로 가기" 버튼 클릭 시
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, loading, scrolling, hasMore]);

  if (loading && currentPage === 1) return <p>Loading movies...</p>;

  return (
    <div className={styles.container}>
      <h2>기다림이 아깝지 않은 콘텐츠</h2>

      {/* 뷰 모드 전환 버튼 */}
      <div className={styles.viewModeToggle}>
        <button onClick={() => setViewMode('table')}>Table View</button>
        <button onClick={() => setViewMode('infinite')}>Infinite Scroll</button>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className={styles.tableView}>
          <table>
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
                  <td><img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} /></td>
                  <td>{movie.title}</td>
                  <td><button>자세히</button></td>
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
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
              </li>
            ))}
          </ul>

          {loading && <p>Loading more...</p>}
        </div>
      )}

      {/* 맨 위로 가기 버튼 */}
      {topVisible && (
        <button className={styles.topButton} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Popular;
