import React from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import PaymentBannerCard from "../components/PaymentBannerCard";

const MakePaymentPage: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      spacing={!isPhoneScreen ? 5 : 1}
      pl={!isPhoneScreen ? 10 : 0}
      pr={!isPhoneScreen ? 10 : 0}
    >
      {!isPhoneScreen ? <h1>Make Payment</h1> : <></>}
      <PaymentBannerCard />
      <Box
        sx={
          !isPhoneScreen
            ? {
                p: 4,
                borderRadius: 2,
                backgroundColor: "white",
                boxShadow: 6,
                width: "100%",
              }
            : {
                p: 2,
                backgroundColor: "white",
                width: "100%",
                height: "70vw",
              }
        }
      ></Box>
    </Stack>
  );
};

export default MakePaymentPage;
