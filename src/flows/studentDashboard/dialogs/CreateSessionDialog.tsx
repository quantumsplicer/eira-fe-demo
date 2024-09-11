// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
interface CreateSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
type Inputs = {
  sessionTitle: string;
  selectedDate: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  description: string;
};

const CreateSessionDialog = ({
  open,
  onClose,
  onSubmit,
}: CreateSessionDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
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
          width: 1000,
          maxWidth: 1000,
          height: 550,
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
          direction="row"
          justifyContent="space-around"
          height="100%"
          alignContent="center"
        >
          <Stack justifyContent="space-evenly">
            <Stack spacing={1}>
              <Typography fontSize={22} fontWeight={550}>
                Making Payment to:
              </Typography>
              <Stack>
                <Typography fontSize={22} fontWeight={650}>
                  Suneel Satpal
                </Typography>
                <Typography fontSize={15} lineHeight={1.2}>
                  +919997945005
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <AmountBreakupCard></AmountBreakupCard>
            </Box>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: "90%", alignSelf: "center" }}
          />
          <Stack justifyContent="space-around" width="40%">
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
                create session for your students
              </Typography>
            </Stack>
            <Stack height="45%" justifyContent="space-around">
              <TextField
                fullWidth
                label="Session Title"
                variant="outlined"
                {...register("sessionTitle", { required: true })}
                size="small"
                sx={{
                  mb: 2,
                  "& .MuiInputLabel-root": {
                    fontSize: "0.9rem", // Reduce the font size of the label
                  },
                }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack direction="row" spacing={3}>
                    <DatePicker
                      label="Add date"
                      {...register("selectedDate", { required: true })}
                      // value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "0.875rem", // Reduce the font size of the input text
                                height: "36px", // Reduce the height of the input
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: "1.2rem", // Reduce the size of the calendar icon
                              },
                              "& .MuiInputLabel-root": {
                                fontSize: "0.75rem", // Reduce the font size of the label
                              },
                            }}
                          />
                        ),
                      }}
                    />
                    <TimePicker
                      label="Start time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      // renderInput={(params) => <TextField {...params} />}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "0.875rem", // Reduce the font size of the input text
                                height: "36px", // Reduce the height of the input
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: "1.2rem", // Reduce the size of the calendar icon
                              },
                              "& .MuiInputLabel-root": {
                                fontSize: "0.75rem", // Reduce the font size of the label
                              },
                            }}
                          />
                        ),
                      }}
                    />
                    <TimePicker
                      label="End time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      // renderInput={(params) => <TextField {...params} />}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "0.875rem", // Reduce the font size of the input text
                                height: "36px", // Reduce the height of the input
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: "1.2rem", // Reduce the size of the calendar icon
                              },
                              "& .MuiInputLabel-root": {
                                fontSize: "0.75rem", // Reduce the font size of the label
                              },
                            }}
                          />
                        ),
                      }}
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
                  size="small"
                  sx={{
                    mb: 2,
                    "& .MuiInputLabel-root": {
                      fontSize: "0.9rem", // Reduce the font size of the label
                    },
                  }}
                />
              </FormControl>
            </Stack>
            <Box>
              <Button
                variant="contained"
                fullWidth
                disabled={!selectedDate || !startTime || !endTime}
                onClick={onSubmit}
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionDialog;
