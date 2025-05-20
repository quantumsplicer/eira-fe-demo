import React, { useEffect, useState } from "react";

import { Stack, Box, Typography, useMediaQuery, Button } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "../../../components/PersonalDetails";
import BankAccountDetails from "../../../components/BankAccountDetails";
import NoteBox from "../../../components/NoteBox";
import LinearProgress from "@mui/material/LinearProgress";
import AadhaarVerifyInfo from "../components/AadhaarVerifyInfo";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import SafeLogo from "../../../components/SafeLogo";
import StatusDialog from "../../../dialogs/StatusDialog";
import StatusDrawer from "../../../components/StatusDrawer";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useOnboarding } from "../../../customHooks/useOnboarding";

const TutorSignUp: React.FC = () => {
  const activeFlow = localStorage.getItem("activeFlow");
  const [signUpStep, setSignUpStep] = useState<number>(1);
  const tutorOnboardingStep = localStorage.getItem("tutorOnboardingStep");
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const onboardingUsername = localStorage.getItem("onboardingUsername");
  const navigate = useNavigate();

  const notPhoneScreen = useMediaQuery("(min-width:850px)");

  const { determineOnboardingStep } = useOnboarding();

  const step1Notes = [
    "Input First Name and Last Name as on PAN given.",
    "Make sure you give a valid PAN.",
  ];

  const step2Notes = [
    onboardingUsername ? `Please enter account details associated with ${onboardingUsername}` : "Please ensure that account holder's name is same as the name entered before",
  ];

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setIsSessionExpired(true);
      return;
    }

    const checkOnboardingStep = async () => {
      if (tutorOnboardingStep && tutorOnboardingStep === "3") {
        setSignUpStep(Number(tutorOnboardingStep));
      } else {
        const { navigateTo, onboardingStep } = await determineOnboardingStep();
        onboardingStep === 3 ? setSignUpStep(onboardingStep as number) : navigate(navigateTo as string);
      }
    }
    checkOnboardingStep();
  }, [])

  const LoginButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: 1.5,
          borderRadius: 20,
          height: 45,
          mt: 5,
          width: '100%',
          minWidth: '320px',
          maxWidth: '400px',
        }}
        onClick={() => navigate("/tutor/login")}
      >
        Login
      </Button>
    )
  }

  return (
    <Box
      pt={7}
      sx={{
        backgroundImage: notPhoneScreen ? `url(${EiraBack})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {notPhoneScreen && (
          <Box position={"absolute"} bottom={52} left={45}>
            <SafeLogo />
          </Box>
        )}
        {notPhoneScreen && (
          <Typography
            ml={10}
            color={"white"}
            variant="h3"
            width={"28%"}
            fontWeight={"bold"}
          >
            Finest tutors use Eira to manage their payments
          </Typography>
        )}
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
          <Stack direction={"column"}>
            {
              signUpStep === 2 && activeFlow !== "tutorKyc" &&
              <ArrowBackIosIcon onClick={() => {
                localStorage.setItem("autoFillDetails", "true");
                setSignUpStep(signUpStep-1)
              }} />
            }
            <img
              src={EiraLogo}
              style={{
                alignSelf: notPhoneScreen ? "flex-start" : "center",
                width: 80,
              }}
            />
            <Stack alignItems={"center"} mt={notPhoneScreen ? 2 : 5}>
              <Typography color={"black"} variant="h6" fontWeight={"bold"}>
                Tutor Sign-up
              </Typography>
              <Stack
                direction={"row"}
                width={notPhoneScreen ? "60%" : "300px"}
                mt={notPhoneScreen ? 2 : 3}
                mb={notPhoneScreen ? 5 : 7}
              >
                <Box width={"32%"} mr={1}>
                  <LinearProgress variant="determinate" value={100} />
                </Box>
                <Box width="32%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    value={signUpStep >= 2 ? 100 : 0}
                  />
                </Box>
                <Box width="32%">
                  <LinearProgress
                    variant="determinate"
                    value={signUpStep >= 3 ? 100 : 0}
                  />
                </Box>
              </Stack>
              {signUpStep === 1 && (
                <NoteBox heading="Note:" notes={step1Notes} />
              )}
              {signUpStep === 2 && <NoteBox notes={step2Notes} />}
              {signUpStep === 1 && (
                <PersonalDetails onSuccess={() => setSignUpStep(2)} />
              )}
              {signUpStep === 2 && (
                <BankAccountDetails onSuccess={() => setSignUpStep(3)} />
              )}
              {signUpStep === 3 && (
                <AadhaarVerifyInfo
                  // aadhaarVerificationFailed={aadhaarVerificationFailed}
                  showHeading={true}
                />
              )}
            </Stack>
          </Stack>
          {
            isSessionExpired ?
              (
                notPhoneScreen ?
                  <StatusDialog
                    open={true}
                    onClose={() => { }}
                    type="info"
                    headingMessage="Session Expired!"
                    subHeadingMessage="Please login again"
                    preventDialogClose={true}
                    CustomDialogButton={LoginButton}
                  /> :
                  <StatusDrawer
                    open={true}
                    type="info"
                    headingMessage="Session Expired!"
                    subHeadingMessage1="Please login again"
                    preventDrawerClose={true}
                    CustomDrawerButton={LoginButton}
                  />
              ) : null
          }
        </Box>
      </Stack>
    </Box>
  );
};

export default TutorSignUp;
