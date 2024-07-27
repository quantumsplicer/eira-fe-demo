// src/components/PaymentReviewPage.tsx
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { EiraBack1 } from "../../../components/EiraBack1";

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
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "80%", px: 18 }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
          >
            Payment Info
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 16, mb: 4, textAlign: "center" }}
          >
            Confirm payment details and make payment
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", mb: 2 }}
          >
            <Typography variant="body1">Making payment to:</Typography>
            <Typography variant="body1" fontWeight="bold">
              Suneel Satpal
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", mb: 2 }}
          >
            <Typography variant="body1">Phone:</Typography>
            <Typography variant="body1" fontWeight="bold">
              +91 9389250148
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", mb: 2 }}
          >
            <Typography variant="body1">Amount:</Typography>
            <Typography variant="body1" fontWeight="bold">
              ₹ 5,000
            </Typography>
          </Stack>
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
              href="https://google.com"
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
              href="https://google.com"
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
