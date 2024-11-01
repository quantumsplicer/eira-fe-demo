import React from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import PaymentBannerCard from "../components/PaymentBannerCard";
import Carousel from "react-material-ui-carousel";

const HomePage: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      spacing={!isPhoneScreen ? 5 : 1}
      pl={!isPhoneScreen ? 10 : 0}
      pr={!isPhoneScreen ? 10 : 0}
    >
      {!isPhoneScreen ? <h1>Make Payment</h1> : <></>}
      <PaymentBannerCard />
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
    </Stack>
  );
};

export default HomePage;
