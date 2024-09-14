import React from "react";
import { Divider, Stack } from "@mui/material";

import PaymentLinkCard from "../components/PaymentLinkCard";
import UnsettledAmountCard from "../components/UnsettledAmountCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import CurrentLimitCard from "../components/CurrentLimitCard";
import SharePaymentLinkCard from "../components/SharePaymentLinkCard";
import CreatePaymentLinkCard from "../components/CreatePaymentLinkCard";

const PaymentLinkPage: React.FC = () => {
  return (
    <>
      <Stack spacing={5}>
        <h1>Your Payment Link</h1>
        <Stack spacing={5}>
          <SharePaymentLinkCard />
          <Divider />
          <CreatePaymentLinkCard />
        </Stack>
      </Stack>
    </>
  );
};

export default PaymentLinkPage;
