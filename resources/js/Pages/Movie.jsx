import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button, Chip } from '@mui/material';
import Header from '@/Components/Header/Header.jsx';
import axios from 'axios';

function Movie({ movie, recommendedMovies }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const formattedDate = new Date(movie.release_date).toLocaleDateString();

    useEffect(() => {
        axios.get(`/movie/${movie.id}/check-favorite`)
            .then(response => {
                setIsFavorite(response.data.isFavorite);
            })
            .catch(error => {
                console.error('Error checking if the movie is a favorite:', error);
            });
    }, [movie.id]);

    const addToFavorites = () => {
        axios.post(`/movie/${movie.id}/favorite`)
            .then(() => {
                setIsFavorite(true);
            })
            .catch(() => {
                console.error('Error adding movie to favorites');
            });
    };

    const removeFromFavorites = () => {
        axios.delete(`/movie/${movie.id}/favorite`)
            .then(() => {
                setIsFavorite(false);
            })
            .catch(() => {
                console.error('Error removing movie from favorites');
            });
    };

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
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : `http://127.0.0.1:8000/storage/${movie.poster_path}`}
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
                                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                    {movie.genres && movie.genres.length > 0
                                        ? movie.genres.map(genre => (
                                            <Chip
                                                key={genre.id}
                                                label={genre.name}
                                                style={{
                                                    backgroundColor: '#e0f7fa',
                                                    color: '#00796b',
                                                    fontWeight: 'bold',
                                                    borderRadius: '16px',
                                                }}
                                            />
                                        ))
                                        : <Typography variant="body1" style={{ color: '#777' }}>No genres available</Typography>}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {firstVideoLink ? (
                        renderTrailerPlayer(firstVideoLink)
                    ) : (
                        <Typography variant="body1" color="textSecondary">No trailer available.</Typography>
                    )}

                    <Box textAlign="center" style={{ marginTop: '20px' }}>
                        {isFavorite ? (
                            <Button
                                onClick={removeFromFavorites}
                                variant="contained"
                                color="secondary"
                                style={{
                                    fontSize: '16px',
                                    padding: '10px 20px',
                                    borderRadius: '25px',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#e57373',
                                    '&:hover': {
                                        backgroundColor: '#d32f2f',
                                    }
                                }}
                            >
                                Remove from Favorites
                            </Button>
                        ) : (
                            <Button
                                onClick={addToFavorites}
                                variant="contained"
                                color="primary"
                                style={{
                                    fontSize: '16px',
                                    padding: '10px 20px',
                                    borderRadius: '25px',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#81c784',
                                    '&:hover': {
                                        backgroundColor: '#66bb6a',
                                    }
                                }}
                            >
                                Add to Favorites
                            </Button>
                        )}
                    </Box>

                    {recommendedMovies.length > 0 && (
                        <Grid container spacing={6} style={{ marginTop: '40px' }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#333' }} >
                                    Watching with this movie
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
                                                    <Typography
                                                        variant="body2"
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: '10px',
                                                            left: '10px',
                                                            color: 'white',
                                                            fontWeight: 'bold',
                                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                                                        }}
                                                    >
                                                        {recommendedMovie.title}
                                                    </Typography>
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
