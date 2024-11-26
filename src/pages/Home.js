import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../utils/URL.ts';
import styles from '../styles/Home.module.css';  // CSS 모듈 임포트

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState({
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: []
  });

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const movieListRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('email') || !localStorage.getItem('TMDb-Key')) {
      navigate('/signin');
    } else {
      // 데이터 요청
      const fetchData = async () => {
        try {
          const popular = await getPopularMovies(1);
          const nowPlaying = await getNowPlayingMovies(1);
          const topRated = await getTopRatedMovies(1);
          const upcoming = await getUpcomingMovies(1);
          
          setMovies({
            popular: popular.results,
            nowPlaying: nowPlaying.results,
            topRated: topRated.results,
            upcoming: upcoming.results
          });
        } catch (error) {
          console.error("API 요청 실패:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 6개씩 스크롤 이동 함수
  const moveLeft = () => {
    setCurrentIndex(Math.max(currentIndex - 6, 0)); // 왼쪽으로 6개씩 이동
  };

  const moveRight = () => {
    setCurrentIndex(Math.min(currentIndex + 6, movies.popular.length - 6)); // 오른쪽으로 6개씩 이동
  };

  // 영화 목록을 현재 인덱스를 기준으로 슬라이드
  const visibleMovies = (category) => {
    const startIndex = currentIndex;
    const endIndex = currentIndex + 6;
    return category.slice(startIndex, endIndex);
  };

  return (
    <div className={styles['home-container']}>
      <h1>메인 페이지</h1>

      {/* 인기 영화 */}
      <section>
        <h2>인기 영화</h2>
        <div className={styles['movie-list']} ref={movieListRef}>
          {visibleMovies(movies.popular).map((movie) => (
            <div key={movie.id} className={styles['movie-item']}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-description']}>{movie.overview}</p>
              <p><strong>평점:</strong> {movie.vote_average}</p>
              <p><strong>개봉일:</strong> {movie.release_date}</p>
              <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
            </div>
          ))}
          {/* 화살표 버튼 */}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={moveLeft}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={moveRight}>{">"}</button>
        </div>
      </section>

      {/* 현재 상영작 */}
      <section>
        <h2>현재 상영작</h2>
        <div className={styles['movie-list']} ref={movieListRef}>
          {visibleMovies(movies.nowPlaying).map((movie) => (
            <div key={movie.id} className={styles['movie-item']}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-description']}>{movie.overview}</p>
              <p><strong>평점:</strong> {movie.vote_average}</p>
              <p><strong>개봉일:</strong> {movie.release_date}</p>
              <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
            </div>
          ))}
          {/* 화살표 버튼 */}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={moveLeft}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={moveRight}>{">"}</button>
        </div>
      </section>

      {/* 평점 높은 영화 */}
      <section>
        <h2>평점 높은 영화</h2>
        <div className={styles['movie-list']} ref={movieListRef}>
          {visibleMovies(movies.topRated).map((movie) => (
            <div key={movie.id} className={styles['movie-item']}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-description']}>{movie.overview}</p>
              <p><strong>평점:</strong> {movie.vote_average}</p>
              <p><strong>개봉일:</strong> {movie.release_date}</p>
              <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
            </div>
          ))}
          {/* 화살표 버튼 */}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={moveLeft}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={moveRight}>{">"}</button>
        </div>
      </section>

      {/* 다가오는 영화 */}
      <section>
        <h2>다가오는 영화</h2>
        <div className={styles['movie-list']} ref={movieListRef}>
          {visibleMovies(movies.upcoming).map((movie) => (
            <div key={movie.id} className={styles['movie-item']}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-description']}>{movie.overview}</p>
              <p><strong>평점:</strong> {movie.vote_average}</p>
              <p><strong>개봉일:</strong> {movie.release_date}</p>
              <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
            </div>
          ))}
          {/* 화살표 버튼 */}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={moveLeft}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={moveRight}>{">"}</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
