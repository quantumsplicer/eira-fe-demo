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

const PrivacyPolicy = () => {
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
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Privacy Policy
        </Typography>

        <Stack spacing={2}>
          <Box>
            <ol style={{ listStyle: "none" }}>
              {/* Information We Collect */}
              <li style={{ marginBottom: "15px" }}>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  component="span"
                  mr={1}
                >
                  1.
                </Typography>
                <Typography component="span" fontWeight={"bold"} variant="h5">
                  Information We Collect
                </Typography>

                <ul style={{ marginTop: "10px" }}>
                  <li>
                    For Platform Use:
                    <ul>
                      <li>Student Information:</li>
                      <ul>
                        <li>
                          PAN Card: We collect PAN details from students for
                          identity verification and regulatory compliance.
                        </li>
                        <li>
                          Credit Card Details: Only the last four digits of the
                          student’s credit card number are securely stored for
                          transaction reference and verification.
                        </li>
                        <li>
                          UPI ID and Name: Collected for payment processing and
                          to confirm the identity of the payer.
                        </li>
                        <li>
                          Class Details: We gather information about the classes
                          students enroll in, including schedules and subjects,
                          to facilitate platform services and manage records.
                        </li>
                      </ul>
                    </ul>
                  </li>
                  <li>
                    Merchant Information:
                    <ul>
                      <li>
                        Phone Number: Merchants provide their phone number to
                        set up their account and receive communications about
                        platform services.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              {/* Use of Collected Information */}
              <li style={{ marginBottom: "15px" }}>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  component="span"
                  mr={1}
                >
                  2.
                </Typography>
                <Typography component="span" fontWeight={"bold"} variant="h5">
                  Use of Collected Information
                </Typography>

                <ul style={{ marginTop: "10px" }}>
                  <li>
                    Transaction Processing: Collected data supports secure
                    payments and fund settlements.
                  </li>
                  <li>
                    Verification and Compliance: PAN and payment details are
                    required for identity verification and to meet regulatory
                    standards.
                  </li>
                  <li>
                    Communication: Phone numbers allow us to communicate
                    important updates to merchants as needed.
                  </li>
                </ul>
              </li>
              {/* Data Security */}
              <li style={{ marginBottom: "15px" }}>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  component="span"
                  mr={1}
                >
                  3.
                </Typography>
                <Typography component="span" fontWeight={"bold"} variant="h5">
                  Data Security
                </Typography>

                <Typography mt={"10px"} variant="body1">
                  We use industry-standard security practices to protect all
                  collected data from unauthorized access and misuse. Sensitive
                  information, such as credit card and PAN details, is stored
                  securely to ensure privacy.
                </Typography>
              </li>
              {/* Sharing of Information */}
              <li style={{ marginBottom: "15px" }}>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  component="span"
                  mr={1}
                >
                  4.
                </Typography>
                <Typography component="span" fontWeight={"bold"} variant="h5">
                  Sharing of Information
                </Typography>

                <ul style={{ marginTop: "10px" }}>
                  <li>
                    With Third-Party Providers: We may share limited data with
                    verified third-party payment processors for transaction
                    processing and compliance purposes.
                  </li>
                  <li>
                    Legal Requirements: Information may be disclosed as
                    necessary to comply with legal obligations or regulatory
                    requests.
                  </li>
                </ul>
              </li>
              {/* User Rights */}
              <li style={{ marginBottom: "15px" }}>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  component="span"
                  mr={1}
                >
                  5.
                </Typography>
                <Typography component="span" fontWeight={"bold"} variant="h5">
                  User Rights
                </Typography>

                <Typography mt={"10px"} variant="body1">
                  Students and merchants can request access, updates, or removal
                  of their personal information as applicable. Please reach out
                  to us for assistance in exercising these rights.
                </Typography>
              </li>
              {/* Policy Updates */}
              <li style={{ marginBottom: "15px" }}>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  component="span"
                  mr={1}
                >
                  6.
                </Typography>
                <Typography component="span" fontWeight={"bold"} variant="h5">
                  Policy Updates
                </Typography>

                <Typography mt={"10px"} variant="body1">
                  This Privacy Policy may be updated periodically. We recommend
                  reviewing it regularly for any changes.
                </Typography>
              </li>
              {/* Contact Us */}
              <li>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  component="span"
                  mr={1}
                >
                  7.
                </Typography>
                <Typography component="span" fontWeight={"bold"} variant="h5">
                  Contact Us
                </Typography>

                <Typography mt={"10px"} variant="body1">
                  {`For any questions or concerns about this policy, please contact us at Support+${user?.username.replace(
                    "-",
                    ""
                  )}@eira.club. By using our platform, you agree to the terms outlined in this Privacy Policy.`}
                </Typography>
              </li>
            </ol>
          </Box>

          <Divider sx={{ my: 3 }} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default PrivacyPolicy;
