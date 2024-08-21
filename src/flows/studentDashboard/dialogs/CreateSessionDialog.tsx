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

interface CreateSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateSessionDialog = ({
  open,
  onClose,
  onSubmit,
}: CreateSessionDialogProps) => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 550,
          maxWidth: "50vw",
          height: 490,
          borderRadius: 3,
        },
      }}
    >
      <DialogContent dividers>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          sx={{ height: "100%", pb: 3, pl: 5, pr: 5, pt: 4 }}
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
              create session with your tutor
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
            disabled={!sessionTitle || !selectedDate || !startTime || !endTime}
            onClick={onSubmit}
            sx={{
              backgroundColor: "#507FFD",
              borderRadius: 7,
              fontSize: 15,
              fontWeight: "bold",
              height: 45,
              width: "80%",
            }}
          >
            Proceed to pay
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionDialog;
