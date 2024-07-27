// src/components/InputPaymentDetails.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from "@mui/material";
import EiraBack1 from "../../../assets/images/png/eira-back-1.png";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";

const InputPaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = () => {
    navigate("/pay/review")
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
        <img src={EiraBack1} style={{ width: "100%", height: "100%" }} />
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
            Payment Details
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 16, mb: 4, textAlign: "center" }}
          >
            Enter payment details to make the payment
          </Typography>
          <Box
            sx={{
              mb: 4,
              backgroundColor: "#f9f9f9",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" fontSize={12}>
              Things to keep in mind:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2" fontSize={12}>
                  Make sure you have the correct details for payment transfer.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" fontSize={12}>
                  Make sure you are transferring to an onboarded person OR have
                  their account details to onboard them.
                </Typography>
              </li>
            </ul>
          </Box>
          <TextField
            fullWidth
            label="Amount to pay"
            variant="outlined"
            value={amount}
            onChange={handleAmountChange}
            sx={{
              mb: 2,
              "&:MuiInputBase-input": {
                fontSize: 12,
              },
            }}
            InputProps={{
              startAdornment: (
                <Typography fontSize={14} sx={{ mr: 1 }}>
                  ₹
                </Typography>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Phone number of the tutor"
            variant="outlined"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            sx={{
              mb: 2,
              "&:MuiInputBase-input": {
                fontSize: 12,
              },
            }}
            InputProps={{
              startAdornment: (
                <Stack direction={"row"} spacing={1} sx={{ mr: 1 }}>
                  <img
                    src="https://flagcdn.com/w320/in.png"
                    alt="India Flag"
                    style={{ width: 24, height: 18, marginRight: 8 }}
                  />
                  <Typography fontSize={14}>+91</Typography>
                </Stack>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: 1.5, borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Book a slot
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

export default InputPaymentDetails;
