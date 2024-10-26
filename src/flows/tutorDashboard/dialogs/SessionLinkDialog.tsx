// src/components/OTPDialog.tsx
import React, { useEffect, useState } from "react";
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
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

interface SessionLinkDialogProps {
  open: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
}
type Inputs = {
  sessionTitle: string;
  selectedDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  attendees: string[];
  description: string;
};
const SessionLinkDialog = ({
  open,
  onClose,
  onSuccess,
  onFailure,
  onSubmit,
}: SessionLinkDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      selectedDate: null,
      startTime: null,
      endTime: null,
      attendees: [],
    },
  });

  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [attendeeInput, setAttendeeInput] = useState("");

  const handleOnClose = () => {
    onClose();
  };
  const handleOnSubmit = (data: any) => {
    onSubmit(data);
  };

  const handleAddAttendee = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && attendeeInput.trim()) {
      event.preventDefault();

      const currentAttendees = getValues("attendees") || [];
      // Avoid adding duplicates
      if (!currentAttendees.includes(attendeeInput.trim())) {
        setValue("attendees", [...currentAttendees, attendeeInput.trim()]);
        setAttendeeInput("");
      }
    }
  };

  const handleDeleteAttendee = (attendeeToDelete: string) => () => {
    setValue(
      "attendees",
      getValues("attendees").filter((attendee) => attendee !== attendeeToDelete)
    );
  };
  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      hideBackdrop={isPhoneScreen}
      fullScreen={isPhoneScreen}
      sx={
        !isPhoneScreen
          ? {
              "& .MuiDialog-paper": {
                width: 550,
                maxWidth: "50vw",
                height: 580,
                maxHeight: 700,
                borderRadius: 3,
              },
              p: 2,
            }
          : {
              marginTop: 10,
              "& .MuiDialog-paper": {
                boxShadow: 0,
              },
            }
      }
    >
      <DialogContent dividers>
        <IconButton
          aria-label="close"
          onClick={handleOnClose}
          sx={
            !isPhoneScreen
              ? {
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }
              : {
                  position: "absolute",
                  left: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }
          }
        >
          {!isPhoneScreen ? <CloseIcon /> : <ArrowBackIcon />}
        </IconButton>
        <Stack
          justifyContent="space-between"
          spacing={5}
          pt={5}
          sx={!isPhoneScreen ? {} : { height: "100%" }}
        >
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
                  {...field}
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
                          error={errors.startTime !== undefined ? true : false}
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
            <Controller
              name="attendees"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Add new attendee"
                    value={attendeeInput}
                    onChange={(e) => setAttendeeInput(e.target.value)}
                    onKeyDown={handleAddAttendee}
                  />
                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {field.value.map((attendee) => (
                      <Chip
                        key={attendee}
                        label={attendee}
                        onDelete={handleDeleteAttendee(attendee)}
                      />
                    ))}
                  </Stack>
                </>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Description"
                />
              )}
            />
            {/* <FormControl fullWidth sx={{ mb: 2 }}>
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
            </FormControl> */}
          </Stack>
          <Box width="85%" alignSelf="center" pt={3}>
            <Button
              variant="contained"
              fullWidth
              // disabled={!isValid}
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
              Send Session Link
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SessionLinkDialog;
