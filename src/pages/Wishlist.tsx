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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [topVisible, setTopVisible] = useState<boolean>(false);

  // 로컬 스토리지에서 찜한 영화 목록 불러오기
  const loadMoviesFromLocalStorage = useCallback(() => {
    const savedMovies = localStorage.getItem('wishlist');
    return savedMovies ? JSON.parse(savedMovies) : [];
  }, []);

  // loadMoreMovies를 먼저 선언
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
        const newMovies = JSON.parse(localStorage.getItem('wishlist') || '[]').slice(
          prevMovies.length,
          prevMovies.length + 10
        );
        return [...prevMovies, ...newMovies];
      });
      setLoading(false);
      setScrolling(false);
    }, 500);
  }, [hasMore, movies]);

  // handleScroll 선언은 loadMoreMovies 이후
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (bottom && !scrolling && hasMore) {
      setScrolling(true);
      loadMoreMovies(); // loadMoreMovies를 여기서 호출
    }

    if (window.scrollY > 200) {
      setTopVisible(true);
    } else {
      setTopVisible(false);
    }
  }, [scrolling, hasMore, loadMoreMovies]); // loadMoreMovies를 의존성에 포함

  useEffect(() => {
    const initialMovies = loadMoviesFromLocalStorage();
    setMovies(initialMovies);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, loadMoviesFromLocalStorage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <h2>내가 찜한 리스트</h2>

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

      {loading && <p>Loading more movies...</p>}

      {topVisible && (
        <button className={styles.topButton} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Wishlist;
