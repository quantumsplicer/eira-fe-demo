import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MobileBg from "../../../assets/images/svg/StudentMobileSignInBg.svg";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import MobilePaymentLogo from "../../../assets/images/svg/MobilePayments.svg";
import SouthIcon from "@mui/icons-material/South";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import OTPInput from "../../../components/OTPInput";
import StatusDrawer from "../../../components/StatusDrawer";
import { useNavigate } from "react-router-dom";
import { useGetOtpMutation } from "../../../APIs/definitions/auth";
import { isPhoneNumberValid } from "../../../utils/helperFunctions";
import useGetOnboardingDetails from "../../../hooks/useGetOnboardingDetails";
import { LoadingButton } from "@mui/lab";
import { Loading } from "../../../components/Loading";

const StudentSignInMobile = () => {
  const [phone, setPhone] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isOtpVerificationDone, setIsOtpVerificationDone] =
    useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { navigateToCurrentOnboardingStep, checkProcessIsLoading } =
    useGetOnboardingDetails();

  const [getOtp, { isLoading: getOtpIsLoading }] = useGetOtpMutation();

  const handleSubmit = () => {
    if (isPhoneNumberValid(phone)) {
      setErrorMessage(null);
      getOtp({ phone: phone, role: "student" })
      .unwrap()
      .then(() => {
        setIsDrawerOpen(true);
      })
      .catch(err => {
        console.log(err)
        err.data.message === "The user role and input role does not match." ?
          setErrorMessage("This user is already registered as a teacher") :
          setErrorMessage("Something went wrong. Please try again!")
      });
    }
  };

  const handleContinueClick = () => {
    navigateToCurrentOnboardingStep();
  };

  const ContinueButton = () => {
    return (
      <LoadingButton
        variant="contained"
        color="primary"
        // loading={checkProcessIsLoading}
        sx={{
          padding: 1.5,
          borderRadius: 20,
          height: 45,
          mt: 5,
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
        }}
        onClick={handleContinueClick}
      >
        Continue
      </LoadingButton>
    );
  };

  return checkProcessIsLoading ? (
    <Loading />
  ) : (
    <Box
      // pt={7}
      p={5}
      sx={{
        backgroundImage: `url(${MobileBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        // width={"100%"}
        // minWidth="320px"
        // maxWidth="400px"
      >
        <img
          src={EiraLogo}
          style={{
            marginTop: 35,
            alignSelf: "flex-start",
            width: 120,
          }}
        />
        <Box>
          <Typography
            width={"100%"}
            minWidth="320px"
            maxWidth="400px"
            variant="h4"
            textAlign={"center"}
            mt={10}
            // fontWeight={"500"}
          >
            {`Easy Credit Card and UPI Education Payments with `}
            <Typography display={"inline"} color={"#507FFD"} fontSize={32}>
              Eira
            </Typography>
          </Typography>
        </Box>
        <Typography
          width={"80%"}
          textAlign={"center"}
          mt={7}
          fontSize={20}
          color={"#6f6f6f"}
        >
          {`Make education payments via credit card at just `}
          <span
            style={{
              fontWeight: "bold",
              color: "#000",
              fontSize: 32,
            }}
          >
            1%
          </span>
          <span
            style={{
              fontWeight: "bold",
              color: "#6f6f6f",
              fontSize: 28,
            }}
          >
            *
          </span>
          <span
            style={{
              color: "#6f6f6f",
              fontSize: 20,
            }}
          >
             OR UPI for free
          </span>
        </Typography>
        {/* <Typography mt={2} fontSize={20} color={"#6f6f6f"}>
          OR 
        </Typography>
        <Typography mt={2} fontSize={20} color={"#6f6f6f"}>
          UPI for free
        </Typography> */}
        <img
          src={MobilePaymentLogo}
          style={{
            width: "100%",
            minWidth: "200px",
            maxWidth: "260px",
          }}
        />
        <Stack direction={"row"} mb={5}>
          <Typography fontWeight={"500"} fontSize={18} mr={1}>
            Pay Now
          </Typography>
          <SouthIcon />
        </Stack>
        <PhoneNumberInputField
          label="Phone number"
          phone={phone}
          setPhoneNumber={setPhone}
          onSubmit={handleSubmit}
          autoFocus={true}
        />
        <Box
          mt={5}
          width={"100%"}
          minWidth={"320px"}
          maxWidth={"400px"}
        >
          {
            errorMessage &&
            <Typography fontSize={14} color="red" textAlign={"center"} mb={2}>
              {errorMessage}
            </Typography>
          }
          <LoadingButton
            loading={getOtpIsLoading}
            disabled={phone.length !== 10 || !isPhoneNumberValid(phone)}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              padding: 1.5,
              borderRadius: 20,
              height: 45,
              mt: errorMessage ? 0 : 4.6
            }}
          >
            Submit
          </LoadingButton>
        </Box>
        {isDrawerOpen ? (
          isOtpVerificationDone ? (
            <StatusDrawer
              open={isDrawerOpen && isOtpVerificationDone}
              type="success"
              headingMessage={
                isExistingUser ? "Welcome Back, Maanav" : "Login Successful"
              }
              subHeadingMessage1={
                isExistingUser
                  ? "Start making your tuition payments now"
                  : "Complete your onboarding to start making payments"
              }
              preventDrawerClose={true}
              CustomDrawerButton={ContinueButton}
            />
          ) : (
            <>
              <Box
                  sx={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity as needed
                      zIndex: 9999, // Higher than most background elements
                  }}
                  aria-hidden="true"
              />
              <Drawer
                open={isDrawerOpen}
                // onClose={() => setIsDrawerOpen(false)}
                sx={{
                  zIndex: 10000,
                  width: "100%",
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    padding: 5,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width: "100%",
                    boxSizing: "border-box",
                    height: "500px",
                  },
                }}
                anchor="bottom"
                variant="permanent"
              >
                <Stack alignItems={"center"}>
                  <OTPInput
                    role="student"
                    phoneNumber={phone}
                    onVerified={() => setIsOtpVerificationDone(true)}
                    isDrawer={true}
                    onChangePhoneNumber={() => setIsDrawerOpen(false)}
                  />
                </Stack>
              </Drawer>
            </>
          )
        ) : null}
      </Stack>
    </Box>
  );
};

export default StudentSignInMobile;
