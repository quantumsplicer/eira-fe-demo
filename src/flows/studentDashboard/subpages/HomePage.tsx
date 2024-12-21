import React, { useState } from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import PaymentBannerCard from "../components/PaymentBannerCard";
import Carousel from "react-material-ui-carousel";
import RecentPaymentsCard from "../components/RecentPaymentsCard";
import PromoBannerComponent from "../components/PromoBannerComponent";
import DashboardBannerArt1 from "../../../assets/images/png/student-dashboard-banner-mobile-1.png";
import DashboardBannerArt2 from "../../../assets/images/png/student-dashboard-banner-mobile-2.png";
import PaymentFlow from "../components/PaymentFlow";
import { TutorDetails } from "../interfaces";
import { WHATSAPP_LINK } from "../../../components/GetHelp";
import { trackEvent } from "../../../utils/amplitude";

const HomePage: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);

  return (
    <Stack
      spacing={!isPhoneScreen ? 8 : 1}
      pl={!isPhoneScreen ? 5 : 0}
      pr={!isPhoneScreen ? 5 : 0}
      pt={!isPhoneScreen ? 3.5 : 0}
    >
      {!isPhoneScreen ? <h1>Home Page</h1> : <></>}
      {!isPhoneScreen ? (
        <Stack
          direction="row"
          spacing={4}
          justifyContent={!isPhoneScreen ? "flex-start" : "center"}
        >
          <RecentPaymentsCard />
          <PaymentBannerCard />
        </Stack>
      ) : (
        <PaymentBannerCard />
      )}
      {isPhoneScreen && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "white",
            width: "100%",
            height: "75vw",
          }}
        >
          <Carousel
            sx={{ width: "100%", pb:4, zIndex: 1, position: "relative" }}
            autoPlay={false}
            swipe={true} // Allow swiping
            animation="slide"
            indicatorContainerProps={{
              style: {
                marginTop: "1rem",
                backgroundColor: "white",
              },
            }}
            index={0}
            navButtonsAlwaysVisible={false}
          >
            <Box pb={2}>
              <Box
                component="img"
                src={DashboardBannerArt1}
                width={"100%"}
                onClick={() => {
                  trackEvent("Clicked on Need a Loan Banner")
                  window.open(WHATSAPP_LINK, "_blank")
                }}
                sx={{
                  cursor: "pointer",
                  objectFit: "contain"
                }}
              />
            </Box>
            <Box pb={2}>
              <Box
                component="img"
                src={DashboardBannerArt2}
                width={"100%"}
                onClick={() => {
                  trackEvent("Clicked on Get CC Banner")
                  window.open(WHATSAPP_LINK, "_blank")
                }}
                sx={{
                  cursor: "pointer",
                  objectFit: "contain"
                }}
              />
            </Box>
          </Carousel>
        </Box>
      )}
      {!isPhoneScreen && <PromoBannerComponent />}
      {isPaymentFlowActive && (
        <PaymentFlow
          open={isPaymentFlowActive}
          onClose={() => setIsPaymentFlowActive(false)}
        />
      )}
    </Stack>
  );
};

export default HomePage;
