import React, { useState } from "react";

import { Stack, Box, Typography, Button } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import LoginBg from "../components/LoginBg";
import OTPInput from "../../../components/OTPInput";
import { useGetOtpMutation } from "../../../APIs/definitions/auth";
import { LoadingButton } from "@mui/lab";

const TutorSignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [getOtp, { isLoading: getOtpIsLoading }] = useGetOtpMutation();

  const isPhoneNumberValid = (): boolean => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = () => {
    if (isPhoneNumberValid()) {
      getOtp({ phone: phoneNumber }).then((res) => {
        setIsDialogOpen(true);
      });
    }
  };

  return (
    <Box>
      <LoginBg />
      <Box
        position={"absolute"}
        right={35}
        top={35}
        zIndex={1}
        width={"30%"}
        height={"90vh"}
        bgcolor={"white"}
        border={"1px solid #ccc"}
        padding={5}
        borderRadius={5}
        boxShadow={"2px -2px 14px 2px #00000021"}
      >
        <Stack direction={"column"} width="100%">
          <img
            src={EiraLogo}
            style={{
              alignSelf: "flex-start",
              width: 80,
            }}
          />
          <Stack alignItems={"center"} mt={15}>
            {!isDialogOpen ? (
              <>
                <Typography fontWeight={"bold"} variant="h6">
                  Login as a tutor
                </Typography>
                <Typography mt={1} mb={7}>
                  Enter your phone
                </Typography>
                <PhoneNumberInputField
                  label="Phone number"
                  phone={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  onSubmit={handleSubmit}
                  autoFocus={true}
                />
                <LoadingButton
                  disabled={phoneNumber.length !== 10 || !isPhoneNumberValid()}
                  loading={getOtpIsLoading}
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: 1.5,
                    borderRadius: 20,
                    marginTop: 5,
                    height: 45,
                  }}
                >
                  Verify
                </LoadingButton>
              </>
            ) : (
              <OTPInput navigateTo="/tutor/personal-details" phoneNumber={phoneNumber} />
            )}
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
      </Box>
    </Box>
  );
};

export default TutorSignIn;
