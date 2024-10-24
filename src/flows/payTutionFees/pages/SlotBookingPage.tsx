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

const SlotBookingPage = () => {
  const navigate = useNavigate();
  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const [createOrder] = useCreateOrderMutation();
  const { data: userDetails } = useGetUserDetailsQuery();
  const payeeId = useSelector((state: RootState) => state.onGoingPayment.payeeId);
  const amount = useSelector((state: RootState) => state.onGoingPayment.amount);
  const activePaymentAmount = localStorage.getItem("activePaymentAmount");
  const activePaymentPayeeUserId = localStorage.getItem("activePaymentPayeeUserId");
  const dispatch = useDispatch();

  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const nextHour = dayjs().add(1, "hour").startOf("hour");

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
    const activeFlow = localStorage.getItem("activeFlow");
    localStorage.removeItem("activeFlow");
    if (activeFlow === "dynamicFlow") {
      navigate("/pay/payment-gateway-payment-flow");
      return;
    }
    createOrder({
      amount: Number(activePaymentAmount),
      payer_id: userDetails ? userDetails.id : undefined,
      payee_id: activePaymentPayeeUserId ? activePaymentPayeeUserId : undefined
    })
    .unwrap()
    .then(res => {
      dispatch(setPaymentSessionId(res.payment_session_id));
      localStorage.setItem("activePaymentSessionId", res.payment_session_id);
    })
    .catch(err => {
      console.log(err);
    })
    navigate("/pay/review");
  };

  useEffect(() => {
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
  }, [today, nextHour, sessionTitle, selectedDate, startTime, endTime]);

  useEffect(() => {
    if (!activePaymentAmount || !activePaymentPayeeUserId) {
      navigate("/pay/payment-details");
    }
  }, [])

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
              name="Suneel Satpal"
              phone="+91 93892 50148"
              amount={5000}
              settlementDate="7th October"
              settlementTime="5:00 pm"
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
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: 1.5,
                  borderRadius: 20,
                  mt: notPhoneScreen ? 3 : 25,
                  width: "100%",
                  minWidth: "320px",
                  maxWidth: "400px",
                }}
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Proceed to pay
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default SlotBookingPage;
