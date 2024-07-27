// src/components/SlotBookingPage.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { EiraBack1 } from "../../../components/EiraBack1";

const SlotBookingPage = () => {
  const navigate = useNavigate();
  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [attendeeInput, setAttendeeInput] = useState("");
  const [description, setDescription] = useState("");

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

  const handleAddAttendee = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && attendeeInput.trim() !== "") {
      if (!attendees.includes(attendeeInput.trim())) {
        setAttendees((prev) => [...prev, attendeeInput.trim()]);
      }
      setAttendeeInput("");
    }
  };

  const handleDeleteAttendee = (attendeeToDelete: string) => () => {
    setAttendees((prev) =>
      prev.filter((attendee) => attendee !== attendeeToDelete)
    );
  };

  const handleSubmit = () => {
    navigate("/pay/review");
  };

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
            Create session for your students
          </Typography>
          <TextField
            fullWidth
            label="Session Title"
            variant="outlined"
            value={sessionTitle}
            onChange={handleSessionTitleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={2}>
                <DatePicker
                  label="Add date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  // renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="Start time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  // renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="End time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  // renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add new attendee"
              value={attendeeInput}
              onChange={(e) => setAttendeeInput(e.target.value)}
              onKeyPress={handleAddAttendee}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              {attendees.map((attendee) => (
                <Chip
                  key={attendee}
                  label={attendee}
                  onDelete={handleDeleteAttendee(attendee)}
                />
              ))}
            </Stack>
          </FormControl>
          {/* <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            sx={{ mb: 2 }}
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: 1.5, borderRadius: 2 }}
            onClick={handleSubmit}
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
