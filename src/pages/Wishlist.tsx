import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Wishlist.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const Wishlist = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // 찜한 영화 목록
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 불러올 영화가 있는지
  const [scrolling, setScrolling] = useState<boolean>(false); // 스크롤 중 여부
  const [topVisible, setTopVisible] = useState<boolean>(false); // "맨 위로 가기" 버튼

  // handleScroll 함수 선언
  const handleScroll = useCallback(() => {
    // 스크롤 끝에 도달하면 더 많은 데이터를 로드
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (bottom && !scrolling && hasMore) {
      setScrolling(true);
      loadMoreMovies(); // 영화 데이터 더 불러오기
    }

    // "맨 위로 가기" 버튼 표시
    if (window.scrollY > 200) {
      setTopVisible(true);
    } else {
      setTopVisible(false);
    }
  }, [scrolling, hasMore]);

  // 로컬 스토리지에서 찜한 영화 목록 불러오기
  const loadMoviesFromLocalStorage = useCallback(() => {
    const savedMovies = localStorage.getItem('wishlist');
    if (savedMovies) {
      return JSON.parse(savedMovies);
    }
    return [];
  }, []);

  useEffect(() => {
    const initialMovies = loadMoviesFromLocalStorage();
    setMovies(initialMovies);

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, [handleScroll, loadMoviesFromLocalStorage]); // 의존성 배열에 handleScroll, loadMoviesFromLocalStorage 추가

  const loadMoreMovies = useCallback(() => {
    if (!hasMore) return;

    setLoading(true);

    if (movies.length === 0 || movies.length === JSON.parse(localStorage.getItem('wishlist') || '[]').length) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setMovies((prevMovies) => {
        const newMovies = JSON.parse(localStorage.getItem('wishlist') || '[]').slice(prevMovies.length, prevMovies.length + 10);
        return [...prevMovies, ...newMovies];
      });
      setLoading(false);
      setScrolling(false);
    }, 500);
  }, [hasMore, movies]);  // 의존성 배열에 hasMore, movies 추가

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <h2>내가 찜한 리스트</h2>

      {/* 영화 목록 표시 */}
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <div className={styles.movieDetails}>
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 로딩 중일 때 */}
      {loading && <p>Loading more movies...</p>}

      {/* "맨 위로 가기" 버튼 */}
      {topVisible && (
        <button className={styles.topButton} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Wishlist;
