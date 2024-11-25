import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useGetUserByUserNameQuery } from "../../../APIs/definitions/user";
import { useLocation, useNavigate } from "react-router-dom";
import TutorWebsiteHeader from "../components/TutorWebsiteHeader";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat", // Set the default font family
  },
});

const TutorWebsite = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.pathname.split("/")[1];

  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  const { data: getUserDetails, isLoading: userDetailsIsLoading } =
    useGetUserByUserNameQuery(userName);

  useEffect(() => {
    if (userDetailsIsLoading) return;

    if (!getUserDetails) {
      navigate("/page-not-found");
    }
  }, [userDetailsIsLoading, getUserDetails]);

  return (
    <ThemeProvider theme={theme}>
      <TutorWebsiteHeader />

      {/* Profile Section */}
      <Stack
        sx={{
          p: isPhoneScreen ? 2 : 4,
          alignItems: "center",
          gap: 4,
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Avatar
          alt={getUserDetails?.[0]?.first_name + " " + getUserDetails?.[0]?.last_name}
          sx={{
            width: isPhoneScreen ? 100 : 150,
            height: isPhoneScreen ? 100 : 150,
          }}
        />
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography
            variant={isPhoneScreen ? "h4" : "h3"}
            sx={{ fontWeight: "bold", color: "#232437", textAlign: "center" }}
          >
            {getUserDetails?.[0]?.first_name + " " + getUserDetails?.[0]?.last_name}
          </Typography>
          <Stack
            mt={3}
            spacing={1}
            sx={{ width: isPhoneScreen ? "100%" : 400 }}
          >
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body1" textAlign={"left"}>
                <strong>Phone number:</strong>
              </Typography>
              <Typography variant="body1" textAlign={"right"}>
                {getUserDetails?.[0]?.phone}
              </Typography>
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body1" textAlign={"left"}>
                <strong>Description:</strong>
              </Typography>
              <Stack alignItems={"flex-end"}>
                <Typography variant="body1" textAlign={"right"}>
                  {getUserDetails?.[0]?.first_name + " " + getUserDetails?.[0]?.last_name}
                </Typography>
                <Typography variant="body1" textAlign={"right"}>
                  is a verified Eira teacher
                </Typography>
              </Stack>
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body1" textAlign={"left"}>
                <strong>Subjects taught:</strong>
              </Typography>
              <Typography variant="body1" textAlign={"right"}>
                -
              </Typography>
            </Stack>
            {/* <Stack justifyContent="space-between" direction="row">
              <Typography variant="body1" textAlign={"left"}>
                <strong>Address:</strong>
              </Typography>
              <Typography variant="body1" textAlign={"right"}>
                {getUserDetails?.[0]?.address ?? "-"}
              </Typography>
            </Stack> */}
            <Typography
              textAlign={isPhoneScreen ? "center" : "left"}
              variant="body2"
              sx={{ mt: 2, color: "#888" }}
            >
              Profile last verified: a week ago
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* Buttons Section */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          gap: isPhoneScreen ? 1 : 3,
          flexDirection: isPhoneScreen ? "column" : "row",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: 3,
            backgroundColor: "#9d4edd",
            width: isPhoneScreen ? "90%" : 200,
            mb: isPhoneScreen ? 2 : 0,
            ":hover": {
              backgroundColor: "#6c3bb1",
            },
          }}
          onClick={() => {
            navigate(`/static-link/${userName}`);
          }}
        >
          Book a session
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 3,
            borderColor: "#9d4edd",
            color: "#9d4edd",
            width: isPhoneScreen ? "90%" : 200,
            ":hover": {
              borderColor: "#6c3bb1",
              color: "#6c3bb1",
            },
          }}
          onClick={() => {
            navigate(`/static-link/${userName}`);
          }}
        >
          Pay tuition fees
        </Button>
      </Box>

      {/* Footer Links Section */}
      <Box
        sx={{
          my: 5,
          display: "flex",
          justifyContent: "center",
          gap: 4,
          flexDirection: isPhoneScreen ? "column" : "row",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button
          onClick={() => {
            navigate("terms-of-use");
          }}
          sx={{
            color: "#232437",
            textDecoration: "underline",
            textTransform: "none",
            fontSize: "0.70rem",
          }}
        >
          Terms of Use
        </Button>
        <Button
          onClick={() => {
            navigate("refund-policy");
          }}
          sx={{
            color: "#232437",
            textDecoration: "underline",
            textTransform: "none",
            fontSize: "0.70rem",
          }}
        >
          Refund Policy
        </Button>
        <Button
          onClick={() => {
            navigate("pricing");
          }}
          sx={{
            color: "#232437",
            textDecoration: "underline",
            textTransform: "none",
            fontSize: "0.70rem",
          }}
        >
          Pricing
        </Button>
        <Button
          onClick={() => {
            navigate("contact-policy");
          }}
          sx={{
            color: "#232437",
            textDecoration: "underline",
            textTransform: "none",
            fontSize: "0.70rem",
          }}
        >
          Contact Policy
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default TutorWebsite;
