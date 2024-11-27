import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // 로컬 스토리지에서 찜한 영화 목록 불러오기
    const savedMovies = localStorage.getItem('wishlist');
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies)); // 로컬 스토리지에서 불러와서 상태에 저장
    }

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, []);

  const handleScroll = () => {
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
  };

  const loadMoreMovies = () => {
    // 무한 스크롤로 영화 목록을 불러옴 (여기서는 로컬 스토리지에서 이어서 불러오기)
    if (!hasMore) return;

    setLoading(true);

    // 더 이상 불러올 영화가 없다면 종료
    if (movies.length === 0 || movies.length === JSON.parse(localStorage.getItem('wishlist') || '[]').length) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    // 무한 스크롤로 목록 업데이트
    setTimeout(() => {
      setMovies((prevMovies) => {
        const newMovies = JSON.parse(localStorage.getItem('wishlist') || '[]').slice(prevMovies.length, prevMovies.length + 10);
        return [...prevMovies, ...newMovies];
      });
      setLoading(false);
      setScrolling(false);
    }, 500);
  };

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
