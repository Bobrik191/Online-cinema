import React from 'react';

const Recommendations = ({ recommendedMovies }) => {
    return (
        <div>
            <h1>Рекомендованные фильмы</h1>
            <div className="movie-list">
                {recommendedMovies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-poster"
                        />
                        <div className="movie-details">
                            <h2>{movie.title}</h2>
                            <p>{movie.release_date}</p>
                            <p>{movie.description}</p>
                            <p><strong>Рейтинг: </strong>{movie.vote_average} / 10</p>
                            <p><strong>Популярность: </strong>{movie.popularity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
