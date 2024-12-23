import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, TextField, Box } from '@mui/material';
import { Link, usePage } from '@inertiajs/react';

export default function Header({ searchQuery, setSearchQuery }) {
    const { auth } = usePage().props; // Get current user information
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" sx={{ top: 0, width: '100%', backgroundColor: '#1E1E1E', boxShadow: 3 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo Block */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#fff',
                                fontWeight: 'bold',
                                letterSpacing: 2,
                                '&:hover': {
                                    color: '#f50057',
                                    transition: 'color 0.3s ease',
                                },
                            }}
                        >
                            NeFlex
                        </Typography>
                    </Link>
                </Box>

                {/* Search Block */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            width: 250,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                '& fieldset': {
                                    borderColor: '#f50057',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#f50057',
                                },
                            },
                            '& .MuiInputBase-input': {
                                padding: '10px 12px',
                            },
                        }}
                    />
                </Box>

                {/* Auth Buttons Block */}
                <Box>
                    {auth ? (
                        <div>
                            <Button
                                color="inherit"
                                aria-controls="menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                sx={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    '&:hover': {
                                        color: '#f50057',
                                    },
                                }}
                            >
                                {auth.user.name}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleClose}
                                sx={{
                                    '& .MuiPaper-root': {
                                        backgroundColor: '#333',
                                        color: '#fff',
                                    },
                                }}
                            >
                                <MenuItem component={Link} href="/profile" sx={{ color: '#fff' }}>
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    href="/logout"
                                    method="post"
                                    sx={{ color: '#fff' }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <Button
                                component={Link}
                                href="/login"
                                color="inherit"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    '&:hover': {
                                        color: '#f50057',
                                    },
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                href="/register"
                                color="inherit"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    '&:hover': {
                                        color: '#f50057',
                                    },
                                }}
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </Box>

            </Toolbar>
        </AppBar>
    );
}
