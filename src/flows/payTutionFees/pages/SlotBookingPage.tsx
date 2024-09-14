// src/components/SlotBookingPage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import DateTimePicker from "../../../components/DateTimePicker";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import SafeLogo from "../../../components/SafeLogo";

const SlotBookingPage = () => {
  const navigate = useNavigate();
  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  const nextHour = dayjs().add(1, 'hour').startOf('hour');

  const handleSessionTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSessionTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    navigate("/pay/review");
  };

  useEffect(() => {
    setIsButtonDisabled(true);
    if (sessionTitle && selectedDate && selectedDate >= dayjs().startOf('day') && startTime && endTime && endTime > startTime) {
      setIsButtonDisabled(false);
    }
  }, [today, nextHour, sessionTitle, selectedDate, startTime, endTime])

  return (
    <Box
      pt={7}
      sx={{
        backgroundImage: `url(${EiraBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          alignSelf={"flex-end"}
        >
          <SafeLogo />
        </Box>
        <Box
          width={"55%"}
          height={"30%"}
          bgcolor={"#fff"}
          zIndex={10}
          p={5}
          sx={{
            borderRadius: "20px 0 0 20px"
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
        <Box
          width="30vw"
          minHeight="90vh"
          bgcolor={"#fff"}
          border={"1px solid #ccc"}
          padding={5}
          borderRadius={5}
          boxShadow={"2px -2px 14px 2px #00000021"}
        >
          <Stack
            direction={"column"}
          >
            <img
              src={EiraLogo}
              style={{
                alignSelf: "flex-start",
                width: 80,
              }}
            />
            <Stack
              alignItems={"center"}
              mt={5}
            >
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
                fullWidth
                label="Session Title"
                variant="outlined"
                value={sessionTitle}
                onChange={handleSessionTitleChange}
                InputLabelProps={{
                  shrink: false,
                  style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
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
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleDescriptionChange}
                InputLabelProps={{
                  shrink: false,
                  style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
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
                fullWidth
                variant="contained"
                color="primary"
                sx={{ padding: 1.5, borderRadius: 2, mt: 3 }}
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
