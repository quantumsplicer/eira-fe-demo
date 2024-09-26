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
import NoteBox from "../../../components/NoteBox";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import { useCheckInvitationAcceptanceQuery } from "../../../APIs/definitions/invitations";
import SafeLogo from "../../../components/SafeLogo";

const InputPaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const {data} = useCheckInvitationAcceptanceQuery("6f2c9af2-cbce-49d6-a147-27c40f1c33d4");
  
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
    <Box
      pt={7}
      sx={{
        backgroundImage: `url(${EiraBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          position={"absolute"}
          bottom={52}
          left={45}
        >
          <SafeLogo />
        </Box>
        <Typography
          ml={10}
          color={"white"}
          variant="h3"
          width={"28%"}
          fontWeight={"bold"}
        >
          Tuitions made accessible than ever before with Eira
        </Typography>
        <Box
          mr={5.5}
          width="30vw"
          minHeight="90vh"
          bgcolor={"#fff"}
          border={"1px solid #ccc"}
          padding={5}
          borderRadius={5}
          boxShadow={"2px -2px 14px 2px #00000021"}
        >
          <Stack
            direction={"column"}
          >
            <img
              src={EiraLogo}
              style={{
                alignSelf: "flex-start",
                width: 80,
              }}
            />
            <Stack
              alignItems={"center"}
              mt={5}
            >
              <Typography
                color={"black"}
                variant="h6"
                fontWeight={"bold"}
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
                required
                autoFocus
                fullWidth
                label="Amount to pay"
                variant="outlined"
                value={amount}
                onChange={handleAmountChange}
                onKeyDown={handleKeyDown}
                InputLabelProps={{
                  shrink: false,
                  style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
                  mt: 2,
                  mb: 4,
                  "& .MuiInputBase-root": {
                    height: 45,
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "12px 14px",
                    fontSize: 14,
                  }
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
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ padding: 1.5, borderRadius: 2, mt: 3 }}
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Book a slot
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default InputPaymentDetails;
