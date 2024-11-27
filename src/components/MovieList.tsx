// MovieList.tsx
import React from 'react';
import { Movie } from '../utils/api.tsx'; // 또는 api.tsx에서 가져온 Movie 타입
import MovieCard from './MovieCard.tsx';

interface MovieListProps {
  movies: Movie[]; // movies prop의 타입을 명시적으로 설정
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="movie-list">
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card-wrapper" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
