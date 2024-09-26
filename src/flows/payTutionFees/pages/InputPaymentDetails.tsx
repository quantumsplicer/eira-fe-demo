// src/components/InputPaymentDetails.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import NoteBox from "../../../components/NoteBox";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import { useCheckInvitationAcceptanceQuery } from "../../../APIs/definitions/invitations";
import SafeLogo from "../../../components/SafeLogo";
import AmountBreakupCard from "../../../components/AmountBreakupCard";

const InputPaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const notPhoneScreen = useMediaQuery('(min-width:850px)');

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
        backgroundImage: notPhoneScreen ? `url(${EiraBack})` : '',
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
        {
          notPhoneScreen &&
          <Box
            position={"absolute"}
            bottom={52}
            left={45}
          >
            <SafeLogo />
          </Box>
        }
        {
          notPhoneScreen &&
          <Typography
            ml={10}
            color={"white"}
            variant="h3"
            width={"28%"}
            fontWeight={"bold"}
          >
            Tuitions made accessible than ever before with Eira
          </Typography>
        }
        <Box
          mr={notPhoneScreen ? 5.5 : 0}
          width={notPhoneScreen ? "430px" : "100vw"}
          minHeight={notPhoneScreen ? "90vh" : "100vh"}
          bgcolor={"#fff"}
          border={notPhoneScreen ? "1px solid #ccc" : "none"}
          padding={5}
          borderRadius={notPhoneScreen ? 5 : 0}
          boxShadow={notPhoneScreen ? "2px -2px 14px 2px #00000021" : "none"}
        >
          <Stack
            direction={"column"}
          >
            <img
              src={EiraLogo}
              style={{
                alignSelf: notPhoneScreen ? "flex-start" : "center",
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
                  width: '100%',
                  minWidth: '320px',
                  maxWidth: '400px',
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
              {
                !notPhoneScreen &&
                <Box
                  height="300px"
                  width="350px"
                  bgcolor={"#F5F5F5"}
                  pt={2}
                  pb={2}
                  borderRadius={5}
                  mt={3}
                  mb={3}
                >
                  <AmountBreakupCard
                    amount={Number(amount)}
                    settlementDate={"9th October"}
                    settlementTime={"5:00 pm"}
                  />
                </Box>
              }
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: 1.5,
                  borderRadius: 20,
                  mt: 3,
                  width: '100%',
                  minWidth: '320px',
                  maxWidth: '400px',
                }}
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
