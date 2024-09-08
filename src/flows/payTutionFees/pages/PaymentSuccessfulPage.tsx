// src/components/PaymentSuccessfulPage.tsx
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import Secure from '../../../assets/images/svg/Secure.svg'
import PaymentConfirmation from "../../../components/PaymentConfirmation";

const PaymentSuccessfulPage = () => {

  const paymentDetails = {
    "Transaction ID": ["1feda785cb576a90"],
    "Account Number": ["**** **** **** 2150"],
    "Account Holder": ["Suneel Satpal", "+91 9389250148"],
    "Transaction date & time": ["15:49", "24th Aug, 2024"],
    "Session date & time": ["17:00 - 18:00", "24th Aug, 2024"]
  }

  return (
    <Box
      pt={7}
      sx={{
        backgroundImage: `url(${EiraBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          alignSelf={"flex-end"}
          position={"relative"}
          right={404}
        >
          <img
            src={Secure}
            style={{
              height: "50px",
              width: "50px"
            }}
          />
          <Typography
            color={"white"}
            fontWeight={"bold"}
          >
            100% safe
          </Typography>
        </Stack>
        <Box
          width="30vw"
          minHeight="90vh"
          bgcolor={"#fff"}
          border={"1px solid #ccc"}
          padding={5}
          borderRadius={5}
          boxShadow={"2px -2px 14px 2px #00000021"}
        >
          <Stack
            direction={"column"}
            width="100%"
          >
            <img
              src={EiraLogo}
              style={{
                alignSelf: "flex-start",
                width: 80,
              }}
            />
            <Box
              mt={5}
              width={"100%"}
            >
              <PaymentConfirmation
                name="Suneel Satpal"
                paymentDetails={paymentDetails}
                amount="5000"
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaymentSuccessfulPage;
