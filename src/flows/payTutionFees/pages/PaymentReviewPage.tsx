// src/components/PaymentReviewPage.tsx
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { EiraBack1 } from "../../../components/EiraBack1";
import TutorOnboardingInfo from "../../../components/TutorOnboardingInfo";
import PaymentReviewInfo from "../../../components/PaymentReviewInfo";
import Amount from "../../../components/Amount";

const PaymentReviewPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/pay/payment-gateway-payment-flow");
  };
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: 40,
            color: "white",
            fontWeight: "bold",
            mb: 2,
            position: "absolute",
            top: 100,
            left: 100,
            width: "25%",
          }}
        >
          Pay your tuition fees using credit card @ just 1%
        </Typography>
        <EiraBack1 />
      </Box>
      <Stack sx={{ width: "50%" }} alignItems={"center"}>
        <img
          src={EiraLogo}
          style={{
            alignSelf: "flex-start",
            width: 80,
            position: "absolute",
            marginLeft: 20,
            top: 20,
          }}
        />
        {/* <TutorOnboardingInfo infoMessage="Ask them to complete KYC now to receive the payment" /> */}
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "85%", px: 18 }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              variant="h5"
              sx={{ fontSize: 20 }}
              color={"#969696"}
              mr={1}
            >
              paying
            </Typography>
            <Amount amount="5000" />
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              variant="h5"
              sx={{ fontSize: 20 }}
              color={"#969696"}
              mr={1}
            >
              to
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: 20 }}
              mr={1}
              fontWeight={"bold"}
            >
              Suneel Satpal
            </Typography>
          </Stack>
          <Typography
            variant="h5"
            sx={{ fontSize: 18, fontWeight: "bold", mt: 4 }}
          >
            Payment Overview
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 16, mt: 1, mb: 4, textAlign: "center" }}
          >
            Review the payment details and proceed to pay
          </Typography>
          <Box width={"100%"}>
            <PaymentReviewInfo
              accountNumber="**** **** **** 2150"
              name="Suneel Satpal"
              phoneNumber="+91 9389250148"
              sessionStartTime="17:00"
              sessionEndTime="18:00"
              sessionDate="24th Aug, 2024"
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: 1.5, borderRadius: 20, height: 45, mt: 5 }}
            onClick={handleSubmit}
          >
            Proceed to pay
          </Button>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 4,
              textAlign: "center",
              position: "absolute",
              bottom: 20,
            }}
          >
            <a
              href="https://www.eira.club/privacy-policy"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" color="grey">
                privacy policies
              </Typography>
            </a>
            <Typography variant="body2" color="grey">
              |
            </Typography>
            <a
              href="https://www.eira.club/terms-of-use"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" color="grey">
                terms of use
              </Typography>
            </a>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PaymentReviewPage;
