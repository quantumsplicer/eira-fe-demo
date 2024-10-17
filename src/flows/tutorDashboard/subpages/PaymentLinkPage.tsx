import React from "react";
import { Divider, Stack, useMediaQuery } from "@mui/material";
import SharePaymentLinkCard from "../components/SharePaymentLinkCard";
import CreatePaymentLinkCard from "../components/CreatePaymentLinkCard";

const PaymentLinkPage: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <Stack spacing={5} height="100vh">
      {!isPhoneScreen ? <h1>Your Payment Link</h1> : <></>}
      <Stack spacing={!isPhoneScreen ? 5 : 0}>
        <SharePaymentLinkCard />
        <Divider />
        <CreatePaymentLinkCard />
      </Stack>
    </Stack>
  );
};

export default PaymentLinkPage;
