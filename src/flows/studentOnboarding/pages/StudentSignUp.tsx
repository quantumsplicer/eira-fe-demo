import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import NoteBox from "../../../components/NoteBox";
import PersonalDetails from "../../../components/PersonalDetails";
import { useNavigate } from "react-router-dom";
import useGetOnboardingDetails from "../../../hooks/useGetOnboardingDetails";
import { Loading } from "../../../components/Loading";

const StudentSignUp = () => {
  const navigate = useNavigate();
  const [activeFlow, setActiveFlow] = useState<string | null>(null);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");

  const noteBoxHeading = "Note:";
  const notes = [
    "Please enter your name exactly as per PAN.",
    "Please enter the PAN linked to your mobile number.",
    "Please make sure you are transferring to a registered tutor or have their account details to onboard them.",
  ];

  const { navigateToCurrentOnboardingStep, checkProcessIsLoading } =
    useGetOnboardingDetails();

  useEffect(() => {
    const flow = localStorage.getItem("activeFlow");
    setActiveFlow(flow);
  }, []);

  return checkProcessIsLoading ? (
    <Loading />
  ) : (
    <Box
      pt={5}
      pb={5}
      sx={{
        backgroundImage: notPhoneScreen ? `url(${EiraBack})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        mr={notPhoneScreen ? -10 : 0}
      >
        {notPhoneScreen &&
          (activeFlow === "staticFlow" || activeFlow === "dynamicFlow") && (
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
                name="Suneel Satpal"
                phone="+91 93892 50148"
                amount={5000}
              />
            </Box>
          )}
        <Box
          width={notPhoneScreen ? "430px" : "100vw"}
          minHeight={notPhoneScreen ? "90vh" : "100vh"}
          bgcolor={"#fff"}
          border={notPhoneScreen ? "1px solid #ccc" : "none"}
          padding={5}
          borderRadius={notPhoneScreen ? 5 : 0}
          boxShadow={notPhoneScreen ? "2px -2px 14px 2px #00000021" : "none"}
          justifySelf={"flex-end"}
        >
          <Stack>
            <img
              src={EiraLogo}
              style={{
                alignSelf: notPhoneScreen ? "flex-start" : "center",
                width: 80,
              }}
            />
            <Stack alignItems={"center"} mt={notPhoneScreen ? 3 : 10}>
              <Typography
                variant="h5"
                sx={{ fontSize: 20, mb: 2, fontWeight: "bold" }}
              >
                Personal details
              </Typography>
              {!notPhoneScreen && (
                <Typography variant="subtitle2" sx={{ mb: 10 }}>
                  Enter your personal details below
                </Typography>
              )}
              <NoteBox heading={noteBoxHeading} notes={notes} />
              <PersonalDetails
                onSuccess={() => {
                  console.log("coming here");
                  navigateToCurrentOnboardingStep();
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default StudentSignUp;
