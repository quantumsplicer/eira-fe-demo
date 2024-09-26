import React from "react";
import { Stack, useMediaQuery } from "@mui/material";

import PaymentLinkCard from "../components/PaymentLinkCard";
import UnsettledAmountCard from "../components/UnsettledAmountCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import CurrentLimitCard from "../components/CurrentLimitCard";
import Carousel from "react-material-ui-carousel";

const PaymentHistory: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Stack spacing={!isPhoneScreen ? 5 : 1}>
        {!isPhoneScreen ? <h1>Payments</h1> : <></>}
        <Stack direction="row" spacing={7}>
          {!isPhoneScreen ? (
            <>
              <UnsettledAmountCard />
              <CurrentLimitCard />
            </>
          ) : (
            <Carousel
              sx={{ width: "100%", pt: 4 }}
              autoPlay={false}
              swipe={true} // Allow swiping
              animation="slide"
            >
              <CurrentLimitCard />
              <UnsettledAmountCard />
            </Carousel>
          )}
        </Stack>
        <PaymentHistoryTable />
      </Stack>
    </>
  );
};

export default PaymentHistory;
