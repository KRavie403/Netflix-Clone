import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../utils/URL.tsx';
import styles from '../styles/Home.module.css';

// 영화 정보 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

interface MoviesState {
  popular: Movie[];
  nowPlaying: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // 상태 변수 타입 지정
  const [movies, setMovies] = useState<MoviesState>({
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: []
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const [popularIndex, setPopularIndex] = useState<number>(0);
  const [nowPlayingIndex, setNowPlayingIndex] = useState<number>(0);
  const [topRatedIndex, setTopRatedIndex] = useState<number>(0);
  const [upcomingIndex, setUpcomingIndex] = useState<number>(0);

  const popularRef = useRef<HTMLDivElement | null>(null);
  const nowPlayingRef = useRef<HTMLDivElement | null>(null);
  const topRatedRef = useRef<HTMLDivElement | null>(null);
  const upcomingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('email') || !localStorage.getItem('TMDb-Key')) {
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

  // 영화 슬라이드 인덱스에 맞춰 영화 리스트 반환
  const visibleMovies = (category: Movie[], index: number): Movie[] => {
    const startIndex = index;
    const endIndex = index + 6;
    return category.slice(startIndex, endIndex);
  };

  // 왼쪽으로 이동
  const moveLeft = (ref: React.RefObject<HTMLDivElement>, setIndex: React.Dispatch<React.SetStateAction<number>>, category: Movie[], currentIndex: number): void => {
    const list = ref.current;
    if (list) {  // ref.current가 null이 아닐 경우에만 실행
      setIndex(Math.max(0, currentIndex - 6));
      list.scrollLeft -= 300;
    }
  };

  // 오른쪽으로 이동
  const moveRight = (ref: React.RefObject<HTMLDivElement>, setIndex: React.Dispatch<React.SetStateAction<number>>, category: Movie[], currentIndex: number): void => {
    const list = ref.current;
    if (list) {  // ref.current가 null이 아닐 경우에만 실행
      setIndex(Math.min(category.length - 6, currentIndex + 6));
      list.scrollLeft += 300;
    }
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((movieId) => movieId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };


  return (
    <div className={styles['home-container']}>

      {/* 인기 영화 */}
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
              <div className={styles['movie-meta']}>
                <p className={styles['movie-rating']}><strong>평점:</strong> {movie.vote_average}</p>
                <p><strong>개봉일:</strong> {movie.release_date}</p>
                <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
                <button
                    className={styles['wishlist-button']}
                    onClick={() => toggleWishlist(movie.id)}
                  >
                    {wishlist.includes(movie.id) ? '✔' : '+'}
                  </button>
              </div>
            </div>
          ))}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(popularRef, setPopularIndex, movies.popular, popularIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(popularRef, setPopularIndex, movies.popular, popularIndex)}>{">"}</button>
        </div>
      </section>

      {/* 현재 상영작 */}
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
              <div className={styles['movie-meta']}>
                <p className={styles['movie-rating']}><strong>평점:</strong> {movie.vote_average}</p>
                <p><strong>개봉일:</strong> {movie.release_date}</p>
                <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
              </div>
            </div>
          ))}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(nowPlayingRef, setNowPlayingIndex, movies.nowPlaying, nowPlayingIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(nowPlayingRef, setNowPlayingIndex, movies.nowPlaying, nowPlayingIndex)}>{">"}</button>
        </div>
      </section>

      {/* 평점 높은 영화 */}
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
              <div className={styles['movie-meta']}>
                <p className={styles['movie-rating']}><strong>평점:</strong> {movie.vote_average}</p>
                <p><strong>개봉일:</strong> {movie.release_date}</p>
                <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
              </div>
            </div>
          ))}
          <button className={`${styles['arrow-button']} ${styles['arrow-left']}`} onClick={() => moveLeft(topRatedRef, setTopRatedIndex, movies.topRated, topRatedIndex)}>{"<"}</button>
          <button className={`${styles['arrow-button']} ${styles['arrow-right']}`} onClick={() => moveRight(topRatedRef, setTopRatedIndex, movies.topRated, topRatedIndex)}>{">"}</button>
        </div>
      </section>

      {/* 다가오는 영화 */}
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
              <div className={styles['movie-meta']}>
                <p className={styles['movie-rating']}><strong>평점:</strong> {movie.vote_average}</p>
                <p><strong>개봉일:</strong> {movie.release_date}</p>
                <p><strong>장르:</strong> {movie.genre_ids.join(', ')}</p>
              </div>
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
