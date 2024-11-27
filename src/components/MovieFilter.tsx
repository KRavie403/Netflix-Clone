import React, { useState, useEffect } from 'react';
import styles from '../styles/MovieFilter.module.css';
import { getDiscoverMovies } from '../utils/URL.tsx';  // 장르를 동적으로 가져오기 위한 API 함수 추가

interface MovieFilterProps {
  onLanguageChange: (language: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
  onGenreChange: (genre: string) => void;
  onRatingChange: (rating: string) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onLanguageChange, onSortChange, onReset, onGenreChange, onRatingChange }) => {
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);  // id를 string으로 저장
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null);  // 에러 상태 추가

  // 장르 목록을 가져오는 함수
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);  // 로딩 시작
        const data = await getDiscoverMovies(1, '');  // 페이지와 기본 genre 파라미터 추가

        if (data && data.genres) {
          const genresList = data.genres.map((genre: { id: number; name: string }) => ({
            id: genre.id.toString(),  // id를 string으로 변환
            name: genre.name
          }));
          setGenres(genresList);
        } else {
          setGenres([]);  // 장르 목록이 없으면 빈 배열로 설정
        }
      } catch (error) {
        setError('장르를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);  // 로딩 종료
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.movieFilter}>
      <div className={styles.dropdown}>
        <label htmlFor="language">언어</label>
        <select id="language" onChange={(e) => onLanguageChange(e.target.value)}>
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
          <option value="ja-JP">일본어</option>
        </select>
      </div>

      <div className={styles.dropdown}>
        <label htmlFor="genre">장르</label>
        <select id="genre" onChange={(e) => onGenreChange(e.target.value)}>
          <option value="">장르 선택</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.dropdown}>
        <label htmlFor="rating">평점</label>
        <select id="rating" onChange={(e) => onRatingChange(e.target.value)}>
          <option value="">평점 필터</option>
          <option value="7">7 이상</option>
          <option value="8">8 이상</option>
          <option value="9">9 이상</option>
        </select>
      </div>

      <div className={styles.dropdown}>
        <label htmlFor="sort">정렬 기준</label>
        <select id="sort" onChange={(e) => onSortChange(e.target.value)}>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">개봉일순</option>
          <option value="vote_average.desc">평점순</option>
        </select>
      </div>

      <button onClick={onReset} className={styles.resetButton}>초기화</button>
    </div>
  );
};

export default MovieFilter;
