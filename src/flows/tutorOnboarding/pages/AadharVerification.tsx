import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';

const AadharVerification: React.FC = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            localStorage.setItem('showDialog', 'true');
            navigate('/tutor/dashboard', { state: { previousUrl: window.location.href } });
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100vh', width: "100vw" }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Redirecting in {countdown} seconds...
            </Typography>
        </Stack>
    );
};

export default AadharVerification;
