import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../utils/URL.tsx';
import styles from '../styles/Home.module.css';

// Home 페이지 컴포넌트
const Home = () => {
  const navigate = useNavigate();
  
  const [movies, setMovies] = useState({
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: []
  });
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]); // 즐겨찾기 영화 목록
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null); // 마우스를 올린 영화의 id
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // 최근 검색어

  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);

  const nowPlayingRef = useRef<HTMLDivElement | null>(null);
  const topRatedRef = useRef<HTMLDivElement | null>(null);
  const upcomingRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    setRecentSearches(storedSearches);
    setWishlist(storedWishlist);
  }, []);


  const toggleWishlist = (movieId: number) => {
    setWishlist(prevState => {
      const updatedWishlist = prevState.includes(movieId)
        ? prevState.filter(id => id !== movieId)
        : [...prevState, movieId];

      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // 로컬 스토리지에 저장
      return updatedWishlist;
    });
  };

  const visibleMovies = (category: any[], index: number) => {
    const startIndex = index;
    const endIndex = index + 6;
    return category.slice(startIndex, endIndex);
  };

  const moveLeft = (ref: React.RefObject<HTMLDivElement>, setIndex: React.Dispatch<React.SetStateAction<number>>, category: any[], currentIndex: number) => {
    const list = ref.current;
    setIndex(Math.max(0, currentIndex - 6));
    if (list) list.scrollLeft -= 300;
  };

  const moveRight = (ref: React.RefObject<HTMLDivElement>, setIndex: React.Dispatch<React.SetStateAction<number>>, category: any[], currentIndex: number) => {
    const list = ref.current;
    setIndex(Math.min(category.length - 6, currentIndex + 6));
    if (list) list.scrollLeft += 300;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['home-container']}>
      <section>
        <h2>현재 상영작</h2>
        <div className={styles['movie-list']} ref={nowPlayingRef}>
          {visibleMovies(movies.nowPlaying, nowPlayingIndex).map((movie) => (
            <div
              key={movie.id}
              className={styles['movie-item']}
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-rating']}>평점: {movie.vote_average}</p>

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
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-rating']}>평점: {movie.vote_average}</p>

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
                      className={wishlist.includes(movie.id) ? styles['added-to-wishlist'] : ''}
                    >
                      {wishlist.includes(movie.id) ? '즐겨찾기에서 삭제' : '즐겨찾기에 추가'}
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
        <h2>다음 상영작</h2>
        <div className={styles['movie-list']} ref={upcomingRef}>
          {visibleMovies(movies.upcoming, upcomingIndex).map((movie) => (
            <div
              key={movie.id}
              className={styles['movie-item']}
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles['movie-poster']}
              />
              <h3 className={styles['movie-title']}>{movie.title}</h3>
              <p className={styles['movie-rating']}>평점: {movie.vote_average}</p>

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
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(upcomingRef, setUpcomingIndex, movies.upcoming, upcomingIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(upcomingRef, setUpcomingIndex, movies.upcoming, upcomingIndex)}>{">"}</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
