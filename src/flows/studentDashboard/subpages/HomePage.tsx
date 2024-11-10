import React from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import PaymentBannerCard from "../components/PaymentBannerCard";
import Carousel from "react-material-ui-carousel";
import RecentPaymentsCard from "../components/RecentPaymentsCard";
import PromoBannerComponent from "../components/PromoBannerComponent";

const HomePage: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      spacing={!isPhoneScreen ? 14 : 1}
      pl={!isPhoneScreen ? 5 : 0}
      pr={!isPhoneScreen ? 5 : 0}
      pt={!isPhoneScreen ? 3.5 : 0}
    >
      {!isPhoneScreen ? <h1>Home Page</h1> : <></>}
      <Stack
        direction="row"
        spacing={2}
        justifyContent={!isPhoneScreen ? "space-between" : "center"}
      >
        <RecentPaymentsCard />
        <PaymentBannerCard />
      </Stack>
      {isPhoneScreen && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "white",
            width: "100%",
            height: "70vw",
          }}
        >
          <Carousel
            sx={{ width: "100%", pt: 4 }}
            autoPlay={false}
            swipe={true} // Allow swiping
            animation="slide"
            indicatorContainerProps={{
              style: {
                marginTop: "-0.3rem",
                backgroundColor: "white",
              },
            }}
            index={0}
            navButtonsAlwaysVisible={false}
          >
            <Box
              sx={{
                p: 4,
                width: "100%",
                height: "20vh",
                backgroundColor: "red",
              }}
            >
              <Typography variant="h4">Hello this is banner 1</Typography>
            </Box>
            <Box
              sx={{
                p: 4,
                width: "100%",
                height: "20vh",
                backgroundColor: "blue",
              }}
            >
              <Typography variant="h4">Hello this is banner 2</Typography>
            </Box>
          </Carousel>
        </Box>
      )}
      {!isPhoneScreen && <PromoBannerComponent />}
    </Stack>
  );
};

export default HomePage;
