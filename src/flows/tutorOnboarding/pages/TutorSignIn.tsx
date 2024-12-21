import React, { useEffect, useState } from "react";

import { Stack, Box, Typography, Button, useMediaQuery, FormGroup, FormControlLabel, Checkbox, Link } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import LoginBg from "../components/LoginBg";
import OTPInput from "../../../components/OTPInput";
import { useGetOtpMutation } from "../../../APIs/definitions/auth";
import { LoadingButton } from "@mui/lab";
import { useLazyGetUserDetailsQuery } from "../../../APIs/definitions/user";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../../customHooks/useOnboarding";
import GetHelp from "../../../components/GetHelp";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import { initializeAmplitude, trackEvent } from "../../../utils/amplitude";

const TutorSignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const [getOtp, { isLoading: getOtpIsLoading }] = useGetOtpMutation();
  const { determineOnboardingStep } = useOnboarding();

  const isPhoneNumberValid = (): boolean => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = () => {
    if (isPhoneNumberValid() && checked) {
      setErrorMessage(null);
      getOtp({
        phone: phoneNumber,
        role: "teacher",
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          setIsDialogOpen(true);
        })
        .catch((err) => {
          err.data.message === "The user role and input role does not match."
            ? setErrorMessage("This user is already registered as a student")
            : setErrorMessage("Something went wrong. Please try again!");
        });
    }
  };

  const handlePostOtpVerification = async () => {
    // initialize amplitude
    initializeAmplitude({ role: "teacher" });
    trackEvent("Logged In");
    
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
    <Box
      pt={notPhoneScreen ? 5 : 0}
      pb={notPhoneScreen ? 5 : 0}
      sx={{
        backgroundImage: `url(${EiraBack})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        minHeight: "100vh",
        width: "100vw",
      }}
    >
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
              marginTop: notPhoneScreen ? 0 : 50,
            }}
          />
          <Stack alignItems={"center"} mt={5}>
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
                <Box
                  mt={notPhoneScreen ? 5 : 20}
                  width="100%"
                  minWidth="320px"
                  maxWidth="400px"
                >
                  {errorMessage && (
                    <Typography
                      fontSize={14}
                      color="red"
                      textAlign={"center"}
                      mb={2}
                    >
                      {errorMessage}
                    </Typography>
                  )}

                  <GetHelp />

                  <FormGroup sx={{ mt: 4 }}>
                    <FormControlLabel
                      sx={{ml: 1}}
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={() => {
                            setChecked((checked) => !checked);
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: 11 }} lineHeight={1.3}>
                          I agree to all the{" "}
                          <Link href="https://www.eira.club/privacy-policy">terms and conditions</Link> and{" "}
                          <Link href="https://www.eira.club/privacy-policy">privacy policy</Link>
                        </Typography>
                      }
                    />
                  </FormGroup>

                  <LoadingButton
                    loading={getOtpIsLoading}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!isPhoneNumberValid() || getOtpIsLoading || !checked}
                    sx={{
                      marginTop: errorMessage ? 0 : 4.6,
                      width: "100%",
                      padding: 1.5,
                      borderRadius: 20,
                      height: 45,
                    }}
                  >
                    Verify
                  </LoadingButton>
                </Box>
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
            {/* {notPhoneScreen && (
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
            )} */}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default TutorSignIn;
