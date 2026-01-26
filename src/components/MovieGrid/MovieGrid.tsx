import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

export default function MovieGrid({onSelect, movies}: MovieGridProps) {
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const handleClick = (movie: Movie) => {
        onSelect(movie)
    };

return (
    <ul className={css.grid}>
        {movies.map((movie) => (
            <li key={movie.id} onClick={() => handleClick(movie)}>
                <div className={css.card}>
                    <img
                        className={css.image}
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                    />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
            </li>
        ))}
    </ul>
);
}