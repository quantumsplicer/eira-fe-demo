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

const RefundPolicy = () => {
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
          Refund Policy
        </Typography>

        <Stack spacing={2}>
          <Box>
          <Typography variant="body1">
              <strong>Merchant Name:</strong>{" "}
              {(user?.first_name as string) +
                (user?.last_name as string)}
            </Typography>
            <Typography variant="body1">
              <strong>Merchant Address:</strong> -
            </Typography>
            <Typography variant="body1">
              <strong>Merchant Email:</strong> Support+
              {user?.username.replace("-", "")}@eira.club
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2">
            If the Customer (student) wishes to request a refund, they must
            contact Eira.club within 24 hours of making the payment. Refund
            requests made after this period will not be entertained, as payments
            are promptly settled into the Merchant’s account.
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Once the payment is settled into the Merchant’s account through
            Eira.club, no refunds will be processed. Customers are encouraged to
            confirm all transaction details before completing payment.
          </Typography>

        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default RefundPolicy;
