import React from "react";
import { Box, Typography, Stack, useMediaQuery } from "@mui/material";
import PaymentBannerCard from "../components/PaymentBannerCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";

const PaymentHistoryPage: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      spacing={!isPhoneScreen ? 5 : 1}
      pl={!isPhoneScreen ? 10 : 0}
      pr={!isPhoneScreen ? 10 : 0}
    >
      {!isPhoneScreen ? <h1>Payments History</h1> : <></>}
      <PaymentHistoryTable />
    </Stack>
  );
};

export default PaymentHistoryPage;