import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
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

const StudentSignInMobile = () => {
  const [phone, setPhone] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isOtpVerificationDone, setIsOtpVerificationDone] =
    useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  const navigate = useNavigate();

  const { navigateToCurrentOnboardingStep, checkProcessIsLoading } =
    useGetOnboardingDetails();

  const [getOtp, { isLoading: getOtpIsLoading }] = useGetOtpMutation();

  const handleSubmit = () => {
    if (isPhoneNumberValid(phone)) {
      getOtp({ phone: phone }).then(() => {
        setIsDrawerOpen(true);
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
        loading={checkProcessIsLoading}
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

  return (
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
            {`Tutions made accessible than ever before with `}
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
          {`Pay tuition fees via credit card at just `}
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
        </Typography>
        <img
          src={MobilePaymentLogo}
          style={{
            width: "100%",
            minWidth: "250px",
            maxWidth: "320px",
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
        <LoadingButton
          loading={getOtpIsLoading}
          disabled={phone.length !== 10 || !isPhoneNumberValid(phone)}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            minWidth: "320px",
            maxWidth: "400px",
            padding: 1.5,
            borderRadius: 20,
            marginTop: 3,
            height: 45,
          }}
        >
          Submit
        </LoadingButton>
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
            <Drawer
              open={isDrawerOpen}
              // onClose={() => setIsDrawerOpen(false)}
              sx={{
                width: "100%",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  padding: 5,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  width: "100%",
                  boxSizing: "border-box",
                },
              }}
              anchor="bottom"
              variant="permanent"
            >
              <Stack alignItems={"center"}>
                <OTPInput
                  phoneNumber={phone}
                  onVerified={() => setIsOtpVerificationDone(true)}
                  isDrawer={true}
                />
              </Stack>
            </Drawer>
          )
        ) : null}
      </Stack>
    </Box>
  );
};

export default StudentSignInMobile;
