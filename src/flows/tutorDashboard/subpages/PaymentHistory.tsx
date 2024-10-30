import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import UnsettledAmountCard from "../components/UnsettledAmountCard";
import CurrentLimitCard from "../components/CurrentLimitCard";
import Carousel from "react-material-ui-carousel";
import TabbedDataTableContainer from "../components/TabbedDataTableContainer";

const PaymentHistory: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
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
            animation="fade"
            indicatorContainerProps={{
              style: {
                marginTop: "-0.3rem",
                backgroundColor: "white",
              },
            }}
            index={0}
            navButtonsAlwaysVisible={false}
          >
            <UnsettledAmountCard />
            <CurrentLimitCard />
          </Carousel>
        )}
      </Stack>
      <TabbedDataTableContainer />
    </Stack>
  );
};

export default PaymentHistory;
