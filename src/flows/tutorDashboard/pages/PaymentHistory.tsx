import React from "react";
import { Stack } from "@mui/material";

import PaymentLinkCard from "../components/PaymentLinkCard";
import UnsettledAmountCard from "../components/UnsettledAmountCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import CurrentLimitCard from "../components/CurrentLimitCard";

const PaymentHistory: React.FC = () => {
  return (
    <>
      <Stack spacing={5}>
        <h1>Payments</h1>
        <Stack direction="row" spacing={5}>
          {/* <PaymentLinkCard /> */}
          <UnsettledAmountCard />
          <CurrentLimitCard />
        </Stack>
        <PaymentHistoryTable />
      </Stack>
    </>
  );
};

export default PaymentHistory;
