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
  TextFieldProps,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

interface SessionLinkDialogProps {
  activeDialog: string;
  setActiveDialog: (dialog: string) => void;
}
type Inputs = {
  sessionTitle: string;
  selectedDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  description: string;
};
const SessionLinkDialog = ({
  activeDialog,
  setActiveDialog,
}: SessionLinkDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      selectedDate: null,
      startTime: null,
      endTime: null,
    },
  });
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
          height: 580,
          maxHeight: 700,
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
        <Stack justifyContent="space-between" spacing={5} pt={5}>
          <Stack>
            <Typography fontSize={23} fontWeight={600} align="center">
              Create Session
            </Typography>
            <Typography
              fontSize={12}
              fontWeight={550}
              align="center"
              lineHeight={1.2}
            >
              create session with your students
            </Typography>
          </Stack>
          <Stack
            justifyContent="space-around"
            spacing={2}
            width="85%"
            alignSelf="center"
          >
            <Controller
              name="sessionTitle"
              control={control}
              rules={{ required: "Session Title required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Session Title"
                  variant="outlined"
                  size="small"
                  error={!!errors.sessionTitle}
                  helperText={
                    errors.sessionTitle ? errors.sessionTitle.message : ""
                  }
                  sx={{
                    mb: 0,
                    "& .MuiInputLabel-root": {
                      transform: "translate(0, -6px) scale(0.8)", // Move the label above
                    },
                    "& .MuiInputBase-root": {
                      marginTop: "16px", // Add space between label and input box
                    },
                    "&:MuiInputBase-input": {
                      fontSize: 12,
                    },
                    "& legend": {
                      width: 0,
                    },
                  }}
                />
              )}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
              <Stack direction="row" spacing={3}>
                <Controller
                  name="selectedDate"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Add date"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            error={
                              errors.selectedDate !== undefined ? true : false
                            }
                            helperText={errors.selectedDate ? "Required" : ""}
                            sx={{
                              mb: 0,
                              "& .MuiInputLabel-root": {
                                transform: "translate(0, -6px) scale(0.8)", // Move the label above
                              },
                              "& .MuiInputBase-root": {
                                marginTop: "16px", // Add space between label and input box
                              },
                              "&:MuiInputBase-input": {
                                fontSize: 12,
                              },
                              "& legend": {
                                width: 0,
                              },
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="startTime"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <TimePicker
                      label="Start Time"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small"
                            error={
                              errors.startTime !== undefined ? true : false
                            }
                            helperText={errors.startTime ? "Required" : ""}
                            sx={{
                              mb: 0,
                              "& .MuiInputLabel-root": {
                                transform: "translate(0, -6px) scale(0.8)", // Move the label above
                              },
                              "& .MuiInputBase-root": {
                                marginTop: "16px", // Add space between label and input box
                              },
                              "&:MuiInputBase-input": {
                                fontSize: 12,
                              },
                              "& legend": {
                                width: 0,
                              },
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="endTime"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <TimePicker
                      label="End Time"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            error={errors.endTime !== undefined ? true : false}
                            helperText={errors.endTime ? "Required" : ""}
                            sx={{
                              mb: 0,
                              "& .MuiInputLabel-root": {
                                transform: "translate(0, -6px) scale(0.8)", // Move the label above
                              },
                              "& .MuiInputBase-root": {
                                marginTop: "16px", // Add space between label and input box
                              },
                              "&:MuiInputBase-input": {
                                fontSize: 12,
                              },
                              "& legend": {
                                width: 0,
                              },
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                />
              </Stack>
              {/* </LocalizationProvider> */}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                label="Add new attendee"
                value={attendeeInput}
                onChange={(e) => setAttendeeInput(e.target.value)}
                onKeyPress={handleAddAttendee}
                sx={{
                  mb: 0,
                  "& .MuiInputLabel-root": {
                    transform: "translate(0, -6px) scale(0.8)", // Move the label above
                  },
                  "& .MuiInputBase-root": {
                    marginTop: "16px", // Add space between label and input box
                  },
                  "&:MuiInputBase-input": {
                    fontSize: 12,
                  },
                  "& legend": {
                    width: 0,
                  },
                }}
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                {...register("description")}
                size="small"
                sx={{
                  mb: 0,
                  "& .MuiInputLabel-root": {
                    transform: "translate(0, -6px) scale(0.8)", // Move the label above
                  },
                  "& .MuiInputBase-root": {
                    marginTop: "16px", // Add space between label and input box
                  },
                  "&:MuiInputBase-input": {
                    fontSize: 12,
                  },
                  "& legend": {
                    width: 0,
                  },
                }}
              />
            </FormControl>
          </Stack>
          <Box width="85%" alignSelf="center" pt={3}>
            <Button
              variant="contained"
              fullWidth
              disabled={!isValid}
              onClick={handleSubmit(handleOnSubmit)}
              sx={{
                backgroundColor: "#507FFD",
                borderRadius: 7,
                fontSize: 15,
                fontWeight: "bold",
                paddingLeft: 3,
                paddingRight: 3,
              }}
            >
              Proceed to Pay
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SessionLinkDialog;
