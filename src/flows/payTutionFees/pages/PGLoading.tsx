// src/components/PGLoading.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Stack } from '@mui/material';

const PGLoading: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate('/payment-successful');
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

export default PGLoading;
