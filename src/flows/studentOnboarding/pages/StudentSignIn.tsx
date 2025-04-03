import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PersonalDetails from "../../../components/PersonalDetails";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import NoteBox from "../../../components/NoteBox";
import OTPInput from "../../../components/OTPInput";
import StudentSignInMobile from "./StudentSignInMobile";
import useGetOnboardingDetails from "../../../hooks/useGetOnboardingDetails";
import { useGetOtpMutation } from "../../../APIs/definitions/auth";
import { useLazyGetUserDetailsByIdQuery } from "../../../APIs/definitions/user";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useParams } from "react-router-dom";
import { initializeAmplitude, trackEvent } from "../../../utils/amplitude";

const StudentSignIn = () => {
  const activeFlow = localStorage.getItem("activeFlow");
  const params = useParams();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const [getOtp, { isLoading: getOtpIsLoading }] = useGetOtpMutation();

  const activePaymentTutorName = localStorage.getItem("activePaymentTutorName");
  const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");
  const activePaymentAmount = localStorage.getItem("activePaymentAmount");

  const [isOtpVerificationDone, setIsOtpVerificationDone] =
    useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);

  const notes = [
    "Please make sure that you have the bank account details of the payee accessible.",
    "Please make sure that the person receiving money is onbaorded on Eira or you have the necessary details to onboard them.",
  ];

  const { checkCurrentStudentOnboardingState } = useGetOnboardingDetails();

  const [getUserDetailsbyId] = useLazyGetUserDetailsByIdQuery();

  const isPhoneNumberValid = (): boolean => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = () => {
    if (isPhoneNumberValid()) {
      setErrorMessage(null);
      getOtp({ phone: phoneNumber, role: "student" })
        .unwrap()
        .then(() => {
          setIsDialogOpen(true);
        })
        .catch((err) => {
          err?.data?.message === "The user role and input role does not match."
            ? setErrorMessage("This user is already registered as a teacher")
            : setErrorMessage("Something went wrong. Please try again!");
        });
    }
  };

  const OnOtpVerification = async (id: string) : Promise<string> => {
    // initialize amplitude
    initializeAmplitude({ role: "student" });
    trackEvent("Logged In");

    try {
      const data = await getUserDetailsbyId(id);
      console.log("hereeeeeee data", data);
      setIsOtpVerificationDone(true);
  
      if (data?.data?.pan) {
        const activeFlow = localStorage.getItem("activeFlow");
        console.log("activeFlow", activeFlow);
        if (!activeFlow || activeFlow === "defaultFlow") {
          return "/page-not-found";
        } else if (activeFlow === "StaticLinkFlow") {
          const staticLinkUrl = localStorage.getItem("activeFlowUrl");
          return staticLinkUrl ?? "/page-not-found";
        } else if (activeFlow === "DynamicLinkFlow") {
          const dynamicLinkId = localStorage.getItem("activeFlowQuery");
          return dynamicLinkId ? `/payment-link/${dynamicLinkId}` : "/page-not-found"
        }
      }
      
      // Default path if above conditions aren't met
      return "/student/signup";
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Default fallback return in case of error
      return "/student/signup";
    }
  };

  useEffect(() => {
    console.log("StudentSignIn")
    checkCurrentStudentOnboardingState();
  }, []);

  return notPhoneScreen ? (
    <Box
      pt={5}
      pb={5}
      sx={{
        backgroundImage: `url(${EiraBack})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent="center"
      >
        {(activeFlow === "staticFlow" || activeFlow === "dynamicFlow") && (
          <Box
            width={"55%"}
            height={"30%"}
            bgcolor={"#fff"}
            zIndex={10}
            p={5}
            sx={{
              borderRadius: "20px 0 0 20px",
            }}
          >
            <PaymentBreakupInfo
              name={activePaymentTutorName ?? ""}
              phone={activePaymentTutorId ? `+91 ${activePaymentTutorId}` : ""}
              amount={Number(activePaymentAmount)}
            />
          </Box>
        )}
        <Box
          width="30vw"
          minHeight="90vh"
          bgcolor={"#fff"}
          border={"1px solid #ccc"}
          padding={5}
          borderRadius={5}
          boxShadow={"2px -2px 14px 2px #00000021"}
          justifySelf={"flex-end"}
        >
          <Stack>
            <img
              src={EiraLogo}
              style={{
                alignSelf: "flex-start",
                width: 80,
              }}
            />
            <Stack alignItems={"center"} mt={5}>
              {!isDialogOpen ? (
                <>
                  <Typography fontWeight={"bold"} variant="h6">
                    Login as a student
                  </Typography>
                  <Typography mt={1} mb={5}>
                    Enter your phone number
                  </Typography>
                  <NoteBox notes={notes} />
                  <PhoneNumberInputField
                    label="Phone number"
                    phone={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    onSubmit={handleSubmit}
                    autoFocus={true}
                  />
                  <Box mt={5} width={"100%"}>
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
                    <Typography
                      p={2}
                      sx={{ fontSize: 11 }}
                      lineHeight={1.3}
                      textAlign={"center"}
                      mt={errorMessage ? 0 : 4.6}
                    >
                      By signing in, I agree to all the{" "}
                      <Link href="https://www.eira.club/privacy-policy">terms and conditions</Link> and{" "}
                      <Link href="https://www.eira.club/privacy-policy">privacy policy</Link>
                    </Typography>
                    <LoadingButton
                      loading={getOtpIsLoading}
                      disabled={phoneNumber.length !== 10 || !isPhoneNumberValid()}
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
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
                  role="student"
                  phoneNumber={phoneNumber}
                  onVerified={OnOtpVerification}
                  isDrawer={false}
                  onChangePhoneNumber={() => setIsDialogOpen(false)}
                />
              )}

              {/* {ix */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ) : (
    <StudentSignInMobile />
  );
};

export default StudentSignIn;
