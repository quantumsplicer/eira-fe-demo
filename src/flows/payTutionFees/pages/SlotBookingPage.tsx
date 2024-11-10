// src/components/SlotBookingPage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "../../../components/DateTimePicker";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import SafeLogo from "../../../components/SafeLogo";
import { useCreateOrderMutation } from "../../../APIs/definitions/paymentLinks";
import { useGetUserDetailsQuery } from "../../../APIs/definitions/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/configuration";
import { setPaymentSessionId } from "../../../stores/slices";
import { useCreateSessionMutation } from "../../../APIs/definitions/session";
import { useGetOnboardingStatusQuery } from "../../../APIs/definitions/onboarding";

const SlotBookingPage = () => {
  const navigate = useNavigate();
  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const activePaymentAmount = localStorage.getItem("activePaymentAmount");
  const activePaymentPayeeUserId = localStorage.getItem("activePaymentPayeeUserId");
  const activePaymentTutorName = localStorage.getItem("activePaymentTutorName");
  const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");
  const [errorMessage, setErrorMessage] = useState<string|null>(null);

  const [createSession, { isLoading: createSessionIsLoading }] = useCreateSessionMutation();
  const { data: userDetails } = useGetUserDetailsQuery();

  const { data: tutorOnboardingStatus } = useGetOnboardingStatusQuery(
    activePaymentPayeeUserId as string,
    {
      skip: !activePaymentPayeeUserId,
    }
  );

  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const nextHour = dayjs().add(1, "hour").startOf("hour");
  const moment = require('moment-timezone');

  const handleSessionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    setErrorMessage(null);
    const activeFlow = localStorage.getItem("activeFlow");
    localStorage.removeItem("activeFlow");

    createSession({
      subject: description,
      teacher_id: activePaymentPayeeUserId ?? "",
      student_id: userDetails?.id ?? "",
      amount: activePaymentAmount ? Number(activePaymentAmount) : 0,
      starttime: moment.tz(String(startTime), "ddd, DD MMM YYYY HH:mm:ss [GMT]", "GMT")
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DDTHH:mm:ss"),
      endtime: moment.tz(String(endTime), "ddd, DD MMM YYYY HH:mm:ss [GMT]", "GMT")
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DDTHH:mm:ss"),
      title: sessionTitle
    })
      .unwrap()
      .then(res => {
        navigate("/pay/review");
      })
      .catch(err => {
        console.log(err)
        if (err.status === 400) {
          setErrorMessage(err.data.message);
        } else {
          setErrorMessage("Something went wrong. Please try again!")
        }
      })
  };

  useEffect(() => {
    setErrorMessage(null);
    setIsButtonDisabled(true);
    if (
      sessionTitle &&
      selectedDate &&
      selectedDate >= dayjs().startOf("day") &&
      startTime &&
      endTime &&
      endTime > startTime
    ) {
      setIsButtonDisabled(false);
      localStorage.setItem("activePaymentSessionDate", String(selectedDate));
      localStorage.setItem("activePaymentSessionTime", `${String(startTime)} - ${String(endTime)}`)
    }
  }, [sessionTitle, selectedDate, startTime, endTime]);

  useEffect(() => {
    if (!activePaymentAmount || !activePaymentPayeeUserId) {
      navigate("/pay/payment-details");
    }
  }, [])

  return (
    <Box
      pt={5}
      pb={5}
      sx={{
        backgroundImage: notPhoneScreen ? `url(${EiraBack})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        {notPhoneScreen && (
          <Box alignSelf={"flex-end"}>
            <SafeLogo />
          </Box>
        )}
        {notPhoneScreen && (
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
          width={notPhoneScreen ? "430px" : "100vw"}
          minHeight={notPhoneScreen ? "90vh" : "100vh"}
          bgcolor={"#fff"}
          border={notPhoneScreen ? "1px solid #ccc" : "none"}
          padding={5}
          borderRadius={notPhoneScreen ? 5 : 0}
          boxShadow={notPhoneScreen ? "2px -2px 14px 2px #00000021" : "none"}
        >
          <Stack direction={"column"} alignItems={"center"}>
            <img
              src={EiraLogo}
              alt="logo"
              style={{
                alignSelf: notPhoneScreen ? "flex-start" : "center",
                width: 80,
              }}
            />
            <Stack alignItems={"center"} mt={5}>
              <Typography
                variant="h5"
                sx={{ fontSize: 20, fontWeight: "bold", mt: 5 }}
              >
                Create Session
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: 14, mb: 7, textAlign: "center" }}
              >
                Create session with the tutor
              </Typography>
              <TextField
                required
                label="Session Title"
                variant="outlined"
                value={sessionTitle}
                onChange={handleSessionTitleChange}
                InputLabelProps={{
                  shrink: false,
                  style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
                  width: "100%",
                  minWidth: "320px",
                  maxWidth: "400px",
                  mt: notPhoneScreen ? 0 : 3,
                  mb: 2,
                  "& .MuiInputBase-root": {
                    height: 45,
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "12px 14px",
                    fontSize: 14,
                  },
                }}
              />
              <DateTimePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleDescriptionChange}
                InputLabelProps={{
                  shrink: false,
                  style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
                  width: "100%",
                  minWidth: "320px",
                  maxWidth: "400px",
                  mb: 2,
                  "& .MuiInputBase-root": {
                    height: 45,
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "12px 14px",
                    fontSize: 14,
                  },
                }}
              />
              <Box
                mt={notPhoneScreen ? 3 : 25}
                width= "100%"
                minWidth= "320px"
                maxWidth= "400px"
              >
                {
                  errorMessage &&
                  <Typography fontSize={14} color="red" textAlign={"center"} mb={3}>
                    {errorMessage}
                  </Typography>
                }
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: 1.5,
                    borderRadius: 20,
                    mt: errorMessage ? 0 : 5.8,
                    width:"100%"
                  }}
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                >
                  Proceed to pay
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default SlotBookingPage;
