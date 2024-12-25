import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import Header from '@/Components/Header/Header.jsx';

function Movie({ movie, recommendedMovies }) {
    const formattedDate = new Date(movie.release_date).toLocaleDateString();

    const renderTrailerPlayer = (videoId) => {
        if (typeof videoId !== 'string') {
            return <Typography variant="body1" color="textSecondary">Invalid video ID format.</Typography>;
        }
        return (
            <Box textAlign="center" marginBottom="40px" style={{ marginTop: '40px' }}>
                <iframe
                    width="100%"
                    height="450"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                ></iframe>
            </Box>
        );
    };

    const getFirstVideoLink = (videoLinks) => {
        if (typeof videoLinks === 'string') {
            return videoLinks.split(',').map((link) => link.trim())[0];
        }
        return videoLinks[0];
    };

    const firstVideoLink = getFirstVideoLink(movie.video_links);

    return (
        <div style={{ padding: '40px 20px', backgroundColor: '#fafafa' }}>
            <Header />
            <main style={{ paddingTop: '80px' }}>
                <Container>
                    <Grid container spacing={6}>
                        <Grid item md={4} xs={12} style={{ textAlign: 'center' }}>
                            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
                                {movie.title}
                            </Typography>
                            <img
                                src={movie.poster_path.includes('http')
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`  // Внешняя картинка
                                    : `http://127.0.0.1:8000/storage/${movie.poster_path}`}   // Локальная картинка
                                alt={movie.title}
                                style={{
                                    maxWidth: '100%',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    marginBottom: '40px',
                                }}
                            />
                        </Grid>

                        <Grid item md={8} xs={12}>
                            <Box style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', minHeight: '500px' }}>
                                <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#333' }}>
                                    Description
                                </Typography>
                                <Typography variant="body1" style={{ marginBottom: '24px', color: '#555' }}>
                                    {movie.description || 'Description not available.'}
                                </Typography>
                                <Typography variant="h6" style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                    Additional Info
                                </Typography>
                                <Typography variant="body1" style={{ marginBottom: '8px', color: '#777' }}>Release Date: {formattedDate}</Typography>
                                <Typography variant="body1" style={{ marginBottom: '8px', color: '#777' }}>Popularity: {movie.popularity}</Typography>
                                <Typography variant="body1" style={{ marginBottom: '8px', color: '#777' }}>Average Rating: {movie.vote_average}</Typography>
                                <Typography variant="body1" style={{ marginBottom: '16px', color: '#777' }}>Vote Count: {movie.vote_count}</Typography>

                                <Typography variant="h6" style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                    Genres
                                </Typography>
                                <Box style={{ marginBottom: '24px' }}>
                                    {movie.genres && movie.genres.length > 0 ? (
                                        movie.genres.map((genre, index) => (
                                            <Button
                                                key={index}
                                                variant="outlined"
                                                color="primary"
                                                style={{
                                                    marginRight: '8px',
                                                    marginBottom: '8px',
                                                    padding: '6px 12px',
                                                    borderRadius: '16px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'none',
                                                }}
                                            >
                                                {genre.name}
                                            </Button>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">No genres available.</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Рендерим только первый трейлер */}
                    {firstVideoLink ? (
                        renderTrailerPlayer(firstVideoLink)
                    ) : (
                        <Typography variant="body1" color="textSecondary">No trailer available.</Typography>
                    )}

                    {/* Рекомендованные фильмы */}
                    {recommendedMovies.length > 0 && (
                        <Grid container spacing={6} style={{ marginTop: '40px' }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#333' }}>
                                    Recommended Movies
                                </Typography>
                                <Grid container spacing={3}>
                                    {recommendedMovies.map((recommendedMovie) => (
                                        <Grid item md={3} sm={4} xs={12} key={recommendedMovie.id}>
                                            <a href={`/movie/${recommendedMovie.id}`} style={{ textDecoration: 'none' }}>
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        borderRadius: '10px',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                        height: '350px',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.05)',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`}
                                                        alt={recommendedMovie.title}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease',
                                                        }}
                                                    />
                                                </Box>
                                            </a>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </main>
        </div>
    );
}

export default Movie;
