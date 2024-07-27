// src/components/PaymentSuccessfulPage.tsx
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import EiraBack1 from '../../../assets/images/png/eira-back-1.png';
import EiraLogo from '../../../assets/images/png/eira-logo.png';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PaymentSuccessfulPage = () => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100vw"
      }}
    >
      <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
        <img src={EiraBack1} style={{ width: "100%", height: "100%" }} />
      </Box>
      <Stack sx={{ width: "50%" }} alignItems={"center"}>
        <img
          src={EiraLogo}
          style={{
            alignSelf: "flex-start",
            width: 80,
            position: "absolute",
            marginLeft: 20,
            top: 20,
          }}
        />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "80%", px: 18 }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
          >
            Payment Confirmation
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 16, mb: 4, textAlign: "center" }}
          >
            Your payment is successful
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mb: 2 }}>
            <Typography variant="body1">Making payment to:</Typography>
            <Typography variant="body1" fontWeight="bold">Suneel Satpal</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mb: 2 }}>
            <Typography variant="body1">Phone:</Typography>
            <Typography variant="body1" fontWeight="bold">+91 9389250148</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mb: 2 }}>
            <Typography variant="body1">Amount:</Typography>
            <Typography variant="body1" fontWeight="bold">₹ 5,000</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mb: 2 }}>
            <Typography variant="body1">Tuition date & time:</Typography>
            <Typography variant="body1" fontWeight="bold">5:00 pm - 6:00 pm</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mb: 2 }}>
            <Typography variant="body1">Date:</Typography>
            <Typography variant="body1" fontWeight="bold">24th July, 2024</Typography>
          </Stack>
          <CheckCircleOutlineIcon sx={{ color: 'green', fontSize: 60, mt: 4 }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 4,
              textAlign: "center",
              position: "absolute",
              bottom: 20,
            }}
          >
            <a
              href="https://google.com"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" color="grey">
                privacy policies
              </Typography>
            </a>
            <Typography variant="body2" color="grey">
              |
            </Typography>
            <a
              href="https://google.com"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" color="grey">
                terms of use
              </Typography>
            </a>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PaymentSuccessfulPage;
