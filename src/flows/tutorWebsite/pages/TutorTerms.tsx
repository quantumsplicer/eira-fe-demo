import React, { useState } from "react";
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

const TutorTermsOfUse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.pathname.split("/")[1];

  const { data: getUserDetails, isLoading: userDetailsIsLoading } =
    useGetUserByUserNameQuery(userName);

  const [user] = useState(getUserDetails ? getUserDetails[0] : null);

  return (
    <ThemeProvider theme={theme}>
      <TutorWebsiteHeader />

      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Terms & Conditions
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="body1">
              <strong>Merchant Name:</strong>{" "}
              {(user?.first_name as string) +
                (user?.last_name as string)}
            </Typography>
            <Typography variant="body1">
              <strong>Merchant Address:</strong> VAR
            </Typography>
            <Typography variant="body1">
              <strong>Merchant Phone Number:</strong> {user?.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Merchant Email:</strong> Support+{`${user?.phone}`}@eira.club
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2">
            These Terms and Conditions, together with our Privacy Policy and
            other relevant documents ("Terms"), form a binding agreement between
            the Merchant ("Service Provider," "we," "us," or "our") and the
            Customer ("you" or "your") regarding your use of the goods and
            services supplied by the Merchant and payment acceptances
            facilitated by Cashfree and referred by Eira.club.
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            By using our services or making a payment through the Platform, you
            acknowledge that you have read, understood, and accepted these
            Terms. We reserve the right to update these Terms at any time, and
            it is your responsibility to review them periodically.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            1. Use of Services
          </Typography>
          <Typography variant="body2">
            To access services provided by the Merchant, you agree to provide
            accurate, complete information during the payment process and assume
            responsibility for any actions under your account.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            2. Scope of Services
          </Typography>
          <Typography variant="body2">
            The Merchant supplies goods and services as specified in the
            transaction details. Eira.club acts solely as a payment processing
            platform and is not responsible for the quality, fulfillment, or
            delivery of the Merchant's goods or services.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            3. Disclaimer of Liability
          </Typography>
          <Typography variant="body2">
            Eira.club is not responsible for any issues that arise directly
            between the Merchant and the Customer, including but not limited to
            fraud, chargebacks, disputes, or dissatisfaction with the Merchant's
            goods or services. All issues regarding the quality of service,
            refund eligibility, or other related matters must be resolved
            directly between the Customer and the Merchant.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            4. Proprietary Rights
          </Typography>
          <Typography variant="body2">
            All content related to the Merchant's goods and services is
            proprietary to the Merchant, and no intellectual property rights are
            transferred to the Customer.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            5. Limitations of Warranties
          </Typography>
          <Typography variant="body2">
            The Merchant does not guarantee the accuracy, performance, or
            completeness of any materials or information provided. Customers
            accept these goods and services "as is" and "as available" to the
            fullest extent permitted by law.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            6. Payments and Fees
          </Typography>
          <Typography variant="body2">
            Customers agree to pay the charges associated with the Merchant's
            goods and services via the Platform. Any additional fees, such as
            processing fees or applicable taxes, may apply.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            7. Refund Policy
          </Typography>
          <Typography variant="body2">
            If the Customer (student) wishes to request a refund, they must
            contact Eira.club within 24 hours of making the payment. Refund
            requests made after this period will not be entertained, as payments
            are promptly settled into the Merchant’s account. Once the payment
            is settled into the Merchant’s account through Eira.club, no refunds
            will be processed. Customers are encouraged to confirm all
            transaction details before completing payment.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            8. Unauthorized Use
          </Typography>
          <Typography variant="body2">
            Unauthorized use of the Platform or Services may result in actions
            under these Terms or applicable laws.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            9. Third-Party Links
          </Typography>
          <Typography variant="body2">
            The Platform may contain links to third-party websites. Upon
            accessing these links, you will be governed by the terms of those
            third-party websites.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            10. Governing Law and Jurisdiction
          </Typography>
          <Typography variant="body2">
            These Terms and any disputes related to this transaction will be
            governed by the laws of India, with exclusive jurisdiction in the
            courts of Delhi.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            11. Contact
          </Typography>
          <Typography variant="body2">
            For concerns or communications regarding these Terms, please contact
            the Merchant directly using the information provided on their
            listing or profile. Eira can be contacted at 9873189338.
          </Typography>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default TutorTermsOfUse;
