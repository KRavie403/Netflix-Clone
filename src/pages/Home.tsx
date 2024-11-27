import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../utils/URL.tsx';
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
  const [wishlist, setWishlist] = useState<number[]>([]); // 위시리스트 상태 관리
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null); // 마우스를 올린 영화의 id

  const [popularIndex, setPopularIndex] = useState(0);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);

  const popularRef = useRef(null);
  const nowPlayingRef = useRef(null);
  const topRatedRef = useRef(null);
  const upcomingRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('email') || !localStorage.getItem('TMDB-Key')) {
      navigate('/signin');
    } else {
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

  const toggleWishlist = (movieId: number) => {
    setWishlist(prevState => {
      if (prevState.includes(movieId)) {
        return prevState.filter(id => id !== movieId);
      } else {
        return [...prevState, movieId];
      }
    });
  };

  return (
    <div className={styles['home-container']}>
      {/* 인기 영화 */}
      <section>
        <h2>인기 영화</h2>
        <div className={styles['movie-list']} ref={popularRef}>
          {visibleMovies(movies.popular, popularIndex).map((movie) => (
            <div
              key={movie.id}
              className={styles['movie-item']}
              onMouseEnter={() => setHoveredMovie(movie.id)} // 마우스를 올리면 해당 영화 정보 표시
              onMouseLeave={() => setHoveredMovie(null)} // 마우스를 떼면 팝업 닫기
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-rating']}>평점: {movie.vote_average}</p>

              {/* 포스터 위에 팝업창을 띄운다 */}
              {hoveredMovie === movie.id && (
                <div className={styles['movie-popup']}>
                  <div className={styles['popup-wrapper']}>
                    <div className={styles['popup-content']}>
                      <h3 className={styles['popup-title']}>{movie.title}</h3>
                      <p className={styles['popup-info']}>{movie.overview}</p>
                      <div className={styles['popup-meta']}>
                        <p><strong>개봉일:</strong> {movie.release_date}</p>
                        <p><strong>평점:</strong> {movie.vote_average}</p>
                      </div>
                      <button className={styles['popup-play']}>
                        지금 시청하기
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))}
          
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(popularRef, setPopularIndex, movies.popular, popularIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(popularRef, setPopularIndex, movies.popular, popularIndex)}>{">"}</button>
        </div>
      </section>

      {/* 나머지 영화 섹션들 (현재 상영작, 상위 평점 영화, 개봉 예정 영화) */}
      <section>
        <h2>현재 상영작</h2>
        <div className={styles['movie-list']} ref={nowPlayingRef}>
          {visibleMovies(movies.nowPlaying, nowPlayingIndex).map((movie) => (
            <div
              key={movie.id}
              className={styles['movie-item']}
              onMouseEnter={() => setHoveredMovie(movie.id)} // 마우스를 올리면 해당 영화 정보 표시
              onMouseLeave={() => setHoveredMovie(null)} // 마우스를 떼면 팝업 닫기
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-rating']}>평점: {movie.vote_average}</p>

              {/* 마우스를 올리면 포스터 위에 큰 팝업을 띄운다 */}
              {hoveredMovie === movie.id && (
                <div className={styles['movie-popup']}>
                  <div className={styles['popup-wrapper']}>
                    <div className={styles['popup-content']}>
                      <h3 className={styles['popup-title']}>{movie.title}</h3>
                      <p className={styles['popup-info']}>{movie.overview}</p>
                      <div className={styles['popup-meta']}>
                        <p><strong>개봉일:</strong> {movie.release_date}</p>
                        <p><strong>평점:</strong> {movie.vote_average}</p>
                      </div>
                      <button className={styles['popup-play']}>
                        지금 시청하기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(nowPlayingRef, setNowPlayingIndex, movies.nowPlaying, nowPlayingIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(nowPlayingRef, setNowPlayingIndex, movies.nowPlaying, nowPlayingIndex)}>{">"}</button>
        </div>
      </section>

      <section>
        <h2>상위 평점 영화</h2>
        <div className={styles['movie-list']} ref={topRatedRef}>
          {visibleMovies(movies.topRated, topRatedIndex).map((movie) => (
            <div
              key={movie.id}
              className={styles['movie-item']}
              onMouseEnter={() => setHoveredMovie(movie.id)} // 마우스를 올리면 해당 영화 정보 표시
              onMouseLeave={() => setHoveredMovie(null)} // 마우스를 떼면 팝업 닫기
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-rating']}>평점: {movie.vote_average}</p>

              {/* 포스터 위에 팝업창을 띄운다 */}
              {hoveredMovie === movie.id && (
                <div className={styles['movie-popup']}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles['popup-poster']}
                  />
                  <div className={styles['popup-details']}>
                    <h3>{movie.title}</h3>
                    <p><strong>개봉일:</strong> {movie.release_date}</p>
                    <p><strong>평점:</strong> {movie.vote_average}</p>
                    <p>{movie.overview}</p>
                    <button 
                      onClick={() => toggleWishlist(movie.id)} 
                      className={styles['wishlist-button']}
                    >
                      {wishlist.includes(movie.id) ? '✔' : '+'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(topRatedRef, setTopRatedIndex, movies.topRated, topRatedIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(topRatedRef, setTopRatedIndex, movies.topRated, topRatedIndex)}>{">"}</button>
        </div>
      </section>

      <section>
        <h2>개봉 예정 영화</h2>
        <div className={styles['movie-list']} ref={upcomingRef}>
          {visibleMovies(movies.upcoming, upcomingIndex).map((movie) => (
            <div
              key={movie.id}
              className={styles['movie-item']}
              onMouseEnter={() => setHoveredMovie(movie.id)} // 마우스를 올리면 해당 영화 정보 표시
              onMouseLeave={() => setHoveredMovie(null)} // 마우스를 떼면 팝업 닫기
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-rating']}>평점: {movie.vote_average}</p>

              {/* 포스터 위에 팝업창을 띄운다 */}
              {hoveredMovie === movie.id && (
                <div className={styles['movie-popup']}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles['popup-poster']}
                  />
                  <div className={styles['popup-details']}>
                    <h3>{movie.title}</h3>
                    <p><strong>개봉일:</strong> {movie.release_date}</p>
                    <p><strong>평점:</strong> {movie.vote_average}</p>
                    <p>{movie.overview}</p>
                    <button 
                      onClick={() => toggleWishlist(movie.id)} 
                      className={styles['wishlist-button']}
                    >
                      {wishlist.includes(movie.id) ? '✔' : '+'}
                    </button>
                  </div>
                </div>
              )}
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
