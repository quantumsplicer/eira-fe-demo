// src/components/PaymentSuccessfulPage.tsx
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { EiraBack1 } from "../../../components/EiraBack1";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import Amount from "../../../components/Amount";
import PaymentSuccessInfo from "../../../components/PaymentSuccessInfo";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PaymentSuccessfulPage = () => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: 40,
            color: "white",
            fontWeight: "bold",
            mb: 2,
            position: "absolute",
            top: 100,
            left: 100,
            width: "25%",
          }}
        >
          Pay your tuition fees using credit card @ just 1%
        </Typography>
        <EiraBack1 />
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
          <CheckCircleOutlineIcon
                sx={{ color: "green", fontSize: 90, my: 3 }}
            />
          <Stack
            direction={"row"}
            alignItems={"center"}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: 20 }}
              color={"#969696"}
              mr={1}
            >
              Sent
            </Typography>
            <Amount amount="5000" />
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            mb={4}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: 20 }}
              color={"#969696"}
              mr={1}
            >
              to
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: 20 }}
              mr={1}
              fontWeight={"bold"}
            >
              Suneel Satpal
            </Typography>
          </Stack>
          <Box width={"100%"}>
            <PaymentSuccessInfo
              transactionId="1feda785cb576a90"
              transactionDate="24th Aug, 2024"
              transactionTime="15:35"
              accountNumber="**** **** **** 2150"
              name="Suneel Satpal"
              phoneNumber="+91 9389250148"
              sessionStartTime="17:00"
              sessionEndTime="18:00"
              sessionDate="24th Aug, 2024"
            />
          </Box>
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
              href="https://www.eira.club/privacy-policy"
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
              href="https://www.eira.club/terms-of-use"
              target='_blank'
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
