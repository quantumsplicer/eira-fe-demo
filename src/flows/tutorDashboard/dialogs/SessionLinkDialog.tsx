// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

interface CreatePaymentLinkDialogProps {
  activeDialog: string;
  setActiveDialog: (dialog: string) => void;
}

const SessionLinkDialog = ({
  activeDialog,
  setActiveDialog,
}: CreatePaymentLinkDialogProps) => {
  const handleOnClose = () => {
    setActiveDialog("None");
  };
  const handleOnSubmit = () => {
    setActiveDialog("ConfirmationDialog");
  };
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
  return (
    <Dialog
      open={activeDialog === "SessionLinkDialog" ? true : false}
      onClose={handleOnClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 550,
          maxWidth: "50vw",
          height: 550,
          borderRadius: 3,
        },
        p: 2,
      }}
    >
      <DialogContent dividers>
        <IconButton
          aria-label="close"
          onClick={handleOnClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ height: "100%", pb: 3, pl: 5, pr: 5, pt: 5 }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
              Create Session
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 550 }}>
              create session for your students
            </Typography>
          </Stack>
          <Stack>
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
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleDescriptionChange}
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Stack>
          <Button
            variant="contained"
            disabled={
              !sessionTitle ||
              !selectedDate ||
              !startTime ||
              !endTime ||
              attendees.length === 0
                ? true
                : false
            }
            onClick={handleOnSubmit}
            sx={{
              backgroundColor: "#507FFD",
              borderRadius: 7,
              fontSize: 15,
              fontWeight: "bold",
              height: 45,
              width: "80%",
            }}
          >
            Send Session Invite
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SessionLinkDialog;
