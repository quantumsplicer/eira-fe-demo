import React, { useEffect, useState } from "react";

import { Stack, Box, Typography, Button, useMediaQuery } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import LoginBg from "../components/LoginBg";
import OTPInput from "../../../components/OTPInput";
import { useGetOtpMutation } from "../../../APIs/definitions/auth";
import { LoadingButton } from "@mui/lab";
import { useLazyGetUserDetailsQuery } from "../../../APIs/definitions/user";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../../customHooks/useOnboarding";

const TutorSignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const navigate = useNavigate();

  const [getOtp, { isLoading: getOtpIsLoading }] = useGetOtpMutation();
  const { determineOnboardingStep } = useOnboarding();

  const isPhoneNumberValid = (): boolean => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = () => {
    if (isPhoneNumberValid()) {
      getOtp({
        phone: phoneNumber,
        role: "teacher"
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          setIsDialogOpen(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePostOtpVerification = async () => {
    const navigateTo = localStorage.getItem("tutorOnboardingNavigation");
    if (navigateTo) {
      navigate(navigateTo);
    } else {
      const { navigateTo, onboardingStep } = await determineOnboardingStep();
      localStorage.setItem("tutorOnboardingStep", onboardingStep.toString());
      navigate(navigateTo);
    }
  };

  return (
    <Box>
      {notPhoneScreen && <LoginBg />}
      <Box
        position={notPhoneScreen ? "absolute" : "static"}
        right={35}
        top={35}
        zIndex={1}
        width={notPhoneScreen ? "430px" : "100%"}
        minHeight={notPhoneScreen ? "90vh" : "100vh"}
        bgcolor={"white"}
        border={notPhoneScreen ? "1px solid #ccc" : "none"}
        padding={5}
        borderRadius={notPhoneScreen ? 5 : 0}
        boxShadow={notPhoneScreen ? "2px -2px 14px 2px #00000021" : "none"}
      >
        <Stack direction={"column"} width="100%">
          <img
            src={EiraLogo}
            style={{
              alignSelf: notPhoneScreen ? "flex-start" : "center",
              width: notPhoneScreen ? 80 : 130,
              marginTop: notPhoneScreen ? 0 : 90,
            }}
          />
          <Stack alignItems={"center"} mt={15}>
            {!isDialogOpen ? (
              <>
                <Typography fontWeight={"bold"} variant="h6">
                  Login as a tutor
                </Typography>
                <Typography
                  mt={notPhoneScreen ? 1 : 3}
                  mb={notPhoneScreen ? 7 : 12}
                >
                  Enter your phone
                </Typography>
                <PhoneNumberInputField
                  label="Phone number"
                  phone={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  onSubmit={handleSubmit}
                  autoFocus={true}
                />
                <Button
                  disabled={phoneNumber.length !== 10 || !isPhoneNumberValid()}
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    minWidth: "320px",
                    maxWidth: "400px",
                    padding: 1.5,
                    borderRadius: 20,
                    marginTop: notPhoneScreen ? 5 : 30,
                    height: 45,
                  }}
                >
                  Verify
                </Button>
              </>
            ) : (
              <OTPInput
                role="teacher"
                onVerified={handlePostOtpVerification}
                phoneNumber={phoneNumber}
                isDrawer={false}
                onChangePhoneNumber={() => setIsDialogOpen(false)}
              />
            )}
            {notPhoneScreen && (
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
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default TutorSignIn;
