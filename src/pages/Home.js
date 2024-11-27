import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../utils/URL.ts';
import styles from '../styles/Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState({
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: []
  });

  const [loading, setLoading] = useState(true);

  const [popularIndex, setPopularIndex] = useState(0);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);

  const popularRef = useRef(null);
  const nowPlayingRef = useRef(null);
  const topRatedRef = useRef(null);
  const upcomingRef = useRef(null);

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

  const visibleMovies = (category, index) => {
    const startIndex = index;
    const endIndex = index + 6;
    return category.slice(startIndex, endIndex);
  };

  const moveLeft = (ref, setIndex, category, currentIndex) => {
    const list = ref.current;
    setIndex(Math.max(0, currentIndex - 6));
    list.scrollLeft -= 300;
  };

  const moveRight = (ref, setIndex, category, currentIndex) => {
    const list = ref.current;
    setIndex(Math.min(category.length - 6, currentIndex + 6));
    list.scrollLeft += 300;
  };

  return (
    <div className={styles['home-container']}>

      <section>
        <h2>인기 영화</h2>
        <div className={styles['movie-list']} ref={popularRef}>
          {visibleMovies(movies.popular, popularIndex).map((movie) => (
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
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(popularRef, setPopularIndex, movies.popular, popularIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(popularRef, setPopularIndex, movies.popular, popularIndex)}>{">"}</button>
        </div>
      </section>

      <section>
        <h2>현재 상영작</h2>
        <div className={styles['movie-list']} ref={nowPlayingRef}>
          {visibleMovies(movies.nowPlaying, nowPlayingIndex).map((movie) => (
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
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(nowPlayingRef, setNowPlayingIndex, movies.nowPlaying, nowPlayingIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(nowPlayingRef, setNowPlayingIndex, movies.nowPlaying, nowPlayingIndex)}>{">"}</button>
        </div>
      </section>

      <section>
        <h2>평점 높은 영화</h2>
        <div className={styles['movie-list']} ref={topRatedRef}>
          {visibleMovies(movies.topRated, topRatedIndex).map((movie) => (
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
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(topRatedRef, setTopRatedIndex, movies.topRated, topRatedIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(topRatedRef, setTopRatedIndex, movies.topRated, topRatedIndex)}>{">"}</button>
        </div>
      </section>

      <section>
        <h2>다가오는 영화</h2>
        <div className={styles['movie-list']} ref={upcomingRef}>
          {visibleMovies(movies.upcoming, upcomingIndex).map((movie) => (
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
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(upcomingRef, setUpcomingIndex, movies.upcoming, upcomingIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(upcomingRef, setUpcomingIndex, movies.upcoming, upcomingIndex)}>{">"}</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
