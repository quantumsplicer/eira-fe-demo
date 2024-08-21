// src/components/InputPaymentDetails.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import { EiraBack1 } from "../../../components/EiraBack1";
import NoteBox from "../../../components/NoteBox";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";

const InputPaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState<boolean>(false);

  const noteBoxHeading = "Things to keep in mind:";
  const notes = [
    "Make sure you have the correct details for payment transfer.",
    "Make sure you are transferring to an onboarded person OR have their account details to onboard them."
  ]

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const invalidRegex = /[^0-9]/
    const inputValue = event.target.value;
    if (inputValue === '' || !invalidRegex.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  const isPhoneNumberValid = (): boolean => {
    const regex = /^[6-9]\d{9}$/;
    // setIsPhoneNumberInvalid(!regex.test(phoneNumber));
    return regex.test(phoneNumber);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (!amount || Number(amount) === 0 || !isPhoneNumberValid())
      return;
    const isTutorOnboarded = false;
    if (!isTutorOnboarded) {
      navigate("/pay/tutor-details");
    } else {
      navigate("/pay/create-session");
    }
  };

  useEffect(() => {
    setIsButtonDisabled(true);
    if (Number(amount) !== 0 && phoneNumber.length === 10 && isPhoneNumberValid()) {
      setIsButtonDisabled(false);
    }
  }, [amount, phoneNumber])

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
          sx={{ width: "85%", px: 18 }}
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
          <NoteBox
            heading={noteBoxHeading}
            notes={notes}
          />
          <TextField
            autoFocus
            fullWidth
            label="Amount to pay"
            variant="outlined"
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={handleKeyDown}
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
          <PhoneNumberInputField
            autoFocus={false}
            label="Phone number of the tutor"
            phone={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onSubmit={handleSubmit}
            // isPhoneNumberInvalid={isPhoneNumberInvalid}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: 1.5, borderRadius: 2 }}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
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
