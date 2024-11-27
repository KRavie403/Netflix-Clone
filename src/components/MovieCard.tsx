import React from 'react';
import { Movie } from '../utils/api.tsx'; // Movie 타입을 임포트
import '../styles/MovieCard.module.css';

// MovieCardProps에 movie 속성을 추가
interface MovieCardProps {
  movie: Movie; // movie prop 추가
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-overview">{movie.overview}</p>
        <p className="movie-release-date">개봉일: {movie.release_date}</p>
        <p className="movie-rating">평점: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
