import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: '#222',
                color: '#fff',
                padding: '20px 0',
                textAlign: 'center',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            <Typography variant="body2">
                &copy; 2024 NeFlex. Всі права захищено.
            </Typography>
        </Box>
    );
}

export default Footer;
