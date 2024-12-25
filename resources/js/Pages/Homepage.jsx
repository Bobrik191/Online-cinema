import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Pagination, Rating, Chip } from '@mui/material';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';

function Homepage({ movies }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState('All movies');
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 6;

    const allGenres = Array.from(new Set(movies.flatMap((movie) => movie.genres.map((genre) => genre.name))));

    const filteredMovies = movies.filter((movie) => {
        const matchesGenre = selectedGenre === 'All movies' || movie.genres.some((genre) => genre.name === selectedGenre);
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesSearch;
    });

    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
        setCurrentPage(1);
    };

    return (
        <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <Box sx={{ mt: 10 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <Chip
                        label="All movies"
                        onClick={() => handleGenreSelect('All movies')}
                        color={selectedGenre === 'All movies' ? 'primary' : 'default'}
                        sx={{
                            fontSize: '16px',
                            fontWeight: selectedGenre === 'All movies' ? 'bold' : 'normal',
                            padding: '8px 12px',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            boxShadow: selectedGenre === 'All movies' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                            transition: 'all 0.3s ease',
                        }}
                    />
                    {allGenres.map((genre) => (
                        <Chip
                            key={genre}
                            label={genre}
                            onClick={() => handleGenreSelect(genre)}
                            color={selectedGenre === genre ? 'primary' : 'default'}
                            sx={{
                                fontSize: '16px',
                                fontWeight: selectedGenre === genre ? 'bold' : 'normal',
                                padding: '8px 12px',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                boxShadow: selectedGenre === genre ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    {currentMovies.map((movie) => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4}>
                            <Card sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: 5,
                                maxWidth: 350,
                                margin: 'auto',
                                borderRadius: 2,
                                overflow: 'hidden',
                                height: '100%',
                                backgroundColor: '#fff',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 15,
                                }
                            }}>
                                <a href={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        image={
                                            movie.poster_path.includes('http')
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Внешняя картинка
                                                : `http://127.0.0.1:8000/storage/${movie.poster_path}` // Локальная картинка
                                        }
                                        alt={movie.title}
                                        sx={{
                                            width: '100%',
                                            height: 350,
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {movie.description || 'Описание отсутствует'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Дата выхода: {new Date(movie.release_date).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Популярность: {movie.popularity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Rating
                                                name="read-only"
                                                value={movie.vote_average / 2}
                                                readOnly
                                                sx={{ ml: 1 }}
                                            />
                                            <span style={{ marginLeft: '8px' }}>
                                                {movie.vote_average.toFixed(1)}
                                            </span>
                                        </Typography>
                                        <div style={{ marginTop: '8px' }}>
                                            {movie.genres.map((genre) => (
                                                <Chip
                                                    key={genre.id}
                                                    label={genre.name}
                                                    size="small"
                                                    sx={{ marginRight: '4px', marginBottom: '4px' }}
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </a>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={Math.ceil(filteredMovies.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            </Box>
        </div>
    );
}

export default Homepage;
