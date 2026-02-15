import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListMovies.css';

function ListMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch movie list when component mounts
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch('/api/movies');
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                // Silently fail - could add error UI here if needed
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    if (loading) {
        return <div className="loading">Loading movies...</div>;
    }

    return (
        <div className="list-movies">
            <h1>Movies</h1>
            <div className="movies-grid">
                {movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                        <h2>{movie.title}</h2>
                        <p className="tagline">{movie.tagline}</p>
                        <div className="rating">
                            <span className="vote-average">{movie.vote_average}</span>
                            <span className="out-of"> / 10</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ListMovies;

