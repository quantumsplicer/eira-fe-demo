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
import { EiraBack1 } from "../../../components/EiraBack1";
import DateTimePicker from "../../../components/DateTimePicker";

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
    if(sessionTitle && selectedDate && selectedDate >= dayjs().startOf('day') && startTime && endTime && endTime > startTime) {
      setIsButtonDisabled(false);
    }
  }, [today, nextHour, sessionTitle, selectedDate, startTime, endTime])

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        // width: "95vw",
        height: "100vh",
        p: 0,
        m: 0,
      }}
    >
      <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
        <EiraBack1 />
      </Box>
      <Stack sx={{ width: "50%" }} alignItems={"center"}>
        <img
          src={EiraLogo}
          style={{
            alignSelf: "flex-start",
            width: 80,
            position: "absolute",
            marginLeft: 20,
            top: 20,
          }}
        />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "100%", px: 18 }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
          >
            Create Session
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 16, mb: 4, textAlign: "center" }}
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: 1.5, borderRadius: 2 }}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Proceed to pay
          </Button>
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
                Privacy policies
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
                Terms of use
              </Typography>
            </a>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SlotBookingPage;
