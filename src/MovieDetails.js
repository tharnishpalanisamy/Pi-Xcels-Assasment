import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(`/api/movies/${id}`);
                if (!response.ok) {
                    throw new Error('Movie not found');
                }
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [id]);

    // Convert "DD/MM/YY" format to localized date string
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
        const date = new Date(fullYear, parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString();
    };

    if (loading) {
        return <div className="loading">Loading movie details...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <Link to="/" className="back-button">Back to Movies</Link>
            </div>
        );
    }

    if (!movie) {
        return null;
    }

    return (
        <div className="movie-details">
            <Link to="/" className="back-button">← Back to Movies</Link>

            <div className="details-container">
                <h1>{movie.title}</h1>
                {movie.original_title !== movie.title && (
                    <p className="original-title">Original Title: {movie.original_title}</p>
                )}

                <div className="details-grid">
                    <div className="detail-item">
                        <strong>Tagline:</strong>
                        <span>{movie.tagline || 'N/A'}</span>
                    </div>

                    <div className="detail-item">
                        <strong>Release Date:</strong>
                        <span>{formatDate(movie.release_date)}</span>
                    </div>

                    <div className="detail-item">
                        <strong>Runtime:</strong>
                        <span>{movie.runtime} minutes</span>
                    </div>

                    <div className="detail-item">
                        <strong>Status:</strong>
                        <span>{movie.status}</span>
                    </div>

                    <div className="detail-item">
                        <strong>Vote Average:</strong>
                        <span className="vote-score">{movie.vote_average} / 10</span>
                    </div>

                    <div className="detail-item">
                        <strong>Vote Count:</strong>
                        <span>{movie.vote_count}</span>
                    </div>
                </div>

                <div className="overview-section">
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;

