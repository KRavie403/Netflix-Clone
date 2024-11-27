import React from 'react';
import styles from '../styles/MovieFilter.module.css';

interface MovieFilterProps {
  onLanguageChange: (language: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onLanguageChange, onSortChange, onReset }) => {
  return (
    <div className={styles.movieFilter}>
      <div className={styles.dropdown}>
        <label htmlFor="language">언어</label>
        <select id="language" onChange={(e) => onLanguageChange(e.target.value)}>
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
          <option value="ja-JP">일본어</option>
          {/* 다른 언어들 추가 가능 */}
        </select>
      </div>
      
      <div className={styles.dropdown}>
        <label htmlFor="sort">정렬 기준</label>
        <select id="sort" onChange={(e) => onSortChange(e.target.value)}>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신순</option>
          <option value="vote_average.desc">평점순</option>
        </select>
      </div>

      <button onClick={onReset} className={styles.resetButton}>초기화</button>
    </div>
  );
};

export default MovieFilter;
