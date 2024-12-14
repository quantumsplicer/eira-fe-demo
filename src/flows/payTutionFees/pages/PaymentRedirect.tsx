import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Stack } from '@mui/material';

const PaymentRedirect = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate('/pay/status');
    }, 3000);

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
  )
}

export default PaymentRedirect;