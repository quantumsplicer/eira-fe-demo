import React from "react";
import { Box, Typography, Container, Stack, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TutorWebsiteHeader from "../components/TutorWebsiteHeader";
import { useGetUserByUserNameQuery } from "../../../APIs/definitions/user";
import { useLocation, useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat", // Set the default font family
  },
});

const ContactPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.pathname.split("/")[1];

  const { data: getUserDetails, isLoading: userDetailsIsLoading } =
    useGetUserByUserNameQuery(userName);

  return (
    <ThemeProvider theme={theme}>
      <TutorWebsiteHeader />

      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Contact Policy
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="body1">
              <strong>Name:</strong>{" "}
              {(getUserDetails?.first_name as string) +
                (getUserDetails?.last_name as string)}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> -
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> Support+
              {`${getUserDetails?.phone}`}@eira.club
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />
          
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default ContactPolicy;
