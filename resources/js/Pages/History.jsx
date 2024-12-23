import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import Header from '@/Components/Header/Header.jsx';

function History({ history }) {
    return (
        <div style={{ padding: '40px 20px', backgroundColor: '#fafafa' }}>
            <Header />
            <main style={{ paddingTop: '80px' }}>
                <Container>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: '16px',
                                    color: '#333',
                                }}
                            >
                                Watching history
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* История просмотров */}
                    {history.length > 0 ? (
                        <Grid container spacing={6} style={{ marginTop: '40px' }}>
                            {history.map((item) => (
                                <Grid item md={3} sm={4} xs={12} key={item.id}>
                                    <a
                                        href={`/movie/${item.movie.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
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
                                                src={`https://image.tmdb.org/t/p/w500${item.movie.poster_path}`}
                                                alt={item.movie.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                            />

                                            {/* Оверлей, который появляется при наведении */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    color: '#fff',
                                                    opacity: 0,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: '20px',
                                                    transition: 'opacity 0.3s ease',
                                                    '&:hover': {
                                                        opacity: 1,
                                                    },
                                                }}
                                            >
                                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                                    {item.movie.title}
                                                </Typography>

                                                <Typography variant="body2" style={{ marginTop: '8px' }}>
                                                    Просмотрено: {new Date(item.viewed_at).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </a>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            Нет истории просмотров.
                        </Typography>
                    )}
                </Container>
            </main>
        </div>
    );
}

export default History;
