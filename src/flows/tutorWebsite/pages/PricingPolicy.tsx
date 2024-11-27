import React, { useState } from "react";
import { Box, Typography, Container, Stack, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TutorWebsiteHeader from "../components/TutorWebsiteHeader";
import { useGetUserByUserNameUnsafeQuery } from "../../../APIs/definitions/user";
import { useLocation, useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat", // Set the default font family
  },
});

const PricingPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.pathname.split("/")[1];

  const { data: getUserDetails, isLoading: userDetailsIsLoading } =
    useGetUserByUserNameUnsafeQuery(userName);

  const [user] = useState(getUserDetails ? getUserDetails[0] : null);

  return (
    <ThemeProvider theme={theme}>
      <TutorWebsiteHeader />

      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Pricing Policy
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="body1">
              Effective Date: 10 November 2024
            </Typography>
            <Typography variant="body1">
              {getUserDetails &&
                getUserDetails.length > 0 &&
                `${getUserDetails[0].first_name} ${getUserDetails[0].last_name}`}
            </Typography>
            <Typography variant="body1" mt={2}>
              Standalone Classes/Sessions
            </Typography>
            <ul>
              <li>Price Range: 0 to 5,000 INR</li>
              <li>
                Standalone classes being offered are priced within this range
                based on multiple factors but not limited to subject, duration
                and difficulty level.
              </li>
            </ul>

            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
              Courses
            </Typography>
            <ul>
              <li>Price Range: 0 to 5,000 INR</li>
              <li>
                Courses being offered are priced within the above range based on
                multiple factors but not limited to subject, duration and
                difficulty level.
              </li>
            </ul>

            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
              Payment Policy
            </Typography>
            <ul>
              <li>
                All payments must be made in full before the commencement of
                classes or courses.
              </li>
              <li>
                Courses being offered are priced within the above range based on
                multiple factors but not limited to subject, duration and
                difficulty level.
              </li>
            </ul>

            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
              Disclaimers
            </Typography>
            <ul>
              <li>Price Range: 0 to 5,000 INR</li>
              <li>
                Courses being offered are priced within the above range based on
                multiple factors but not limited to subject, duration and
                difficulty level.
              </li>
            </ul>
          </Box>

          <Divider sx={{ my: 3 }} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default PricingPolicy;
