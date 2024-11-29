import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
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

  const OnOtpVerification = async (id: string) => {
    await getUserDetailsbyId(id).then((data) => {
      data?.data?.pan ? setIsExistingUser(true) : setIsExistingUser(false);
      setIsOtpVerificationDone(true);
    });
  };

  useEffect(() => {
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
                    <Button
                      disabled={
                        phoneNumber.length !== 10 || !isPhoneNumberValid()
                      }
                      onClick={handleSubmit}
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        padding: 1.5,
                        borderRadius: 20,
                        height: 45,
                        mt: errorMessage ? 0 : 4.6,
                      }}
                    >
                      Verify
                    </Button>
                  </Box>
                </>
              ) : (
                <OTPInput
                  role="student"
                  navigateTo="/student/signup"
                  phoneNumber={phoneNumber}
                  onVerified={OnOtpVerification}
                  isDrawer={false}
                  onChangePhoneNumber={() => setIsDialogOpen(false)}
                />
              )}

              {isOtpVerificationDone && (
                <Dialog
                  open={isOtpVerificationDone}
                  onClose={() => {}}
                  sx={{
                    "& .MuiDialog-paper": {
                      width: 500,
                      maxWidth: "50vw",
                      height: 400,
                    },
                    p: 1,
                  }}
                >
                  <DialogContent dividers>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{ height: "100%", pb: 10, pt: 10 }}
                    >
                      <Typography fontSize={22} fontWeight="bold">
                        {isExistingUser ? "Welcome back!" : "Login Successful"}
                      </Typography>
                      <Typography textAlign={"center"}>
                        {isExistingUser
                          ? "You are already registered as a teacher on Eira. Please login using the teacher login page."
                          : "You have successfully logged in as a student. Welcome to Eira!"}
                      </Typography>
                      <CheckCircleOutlineIcon
                        sx={{ mt: 5, fontSize: 90, color: "green" }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => {}}
                        fullWidth
                        sx={{
                          width: "100%",
                          minWidth: "320px",
                          maxWidth: "400px",
                          marginTop: 30,
                          height: 45,
                          borderRadius: 20,
                        }}
                      >
                        Continue
                      </Button>
                    </Stack>
                  </DialogContent>
                </Dialog>
              )}
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
