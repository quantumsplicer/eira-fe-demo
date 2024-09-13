// src/components/OTPDialog.tsx
import React, { useEffect, useState } from "react";
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
interface CreateSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  amount: number;
}
type Inputs = {
  sessionTitle: string;
  selectedDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  description: string;
};

const CreateSessionDialog = ({
  open,
  onClose,
  onSubmit,
  amount,
}: CreateSessionDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      selectedDate: null,
      startTime: null,
      endTime: null,
    },
  });
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
  useEffect(() => {
    console.log("These are errors");
    console.log(errors);
  }, [errors]);
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
              <AmountBreakupCard amount={amount}></AmountBreakupCard>
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
            <Stack height="45%" justifyContent="space-around" spacing={2}>
              <TextField
                fullWidth
                label="Session Title"
                variant="outlined"
                {...register("sessionTitle", { required: true })}
                size="small"
                error={errors.sessionTitle !== undefined ? true : false}
                helperText={errors.sessionTitle ? "Required" : ""}
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
                              error={
                                errors.endTime !== undefined ? true : false
                              }
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
                  {/* <TimePicker
                      label="Start time"
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            {...register("startTime", { required: true })}
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
                    <TimePicker
                      label="End time"
                      // renderInput={(params) => <TextField {...params} />}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            {...register("endTime", { required: true })}
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
                    /> */}
                </Stack>
                {/* </LocalizationProvider> */}
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
            <Box>
              <Button
                variant="contained"
                fullWidth
                disabled={Object.keys(errors).length === 0 ? false : true}
                onClick={handleSubmit(onSubmit)}
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
