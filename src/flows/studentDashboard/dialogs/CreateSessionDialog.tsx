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
  useMediaQuery,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
import { PaymentDetails, SessionDetails, TutorDetails } from "../interfaces";

interface CreateSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SessionDetails) => void;
  onBack: () => void;
  sessionDetails: SessionDetails;
  paymentDetails: PaymentDetails;
  tutorDetails: TutorDetails;
}

const CreateSessionDialog = ({
  open,
  onClose,
  onSubmit,
  onBack,
  sessionDetails,
  paymentDetails,
  tutorDetails,
}: CreateSessionDialogProps) => {
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
    control,
  } = useForm<SessionDetails>({
    defaultValues: {
      sessionTitle: sessionDetails?.sessionTitle,
      date: sessionDetails?.date,
      startTime: sessionDetails?.startTime,
      endTime: sessionDetails?.endTime,
      description: sessionDetails?.description,
    },
  });
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const handleFormSubmit: SubmitHandler<SessionDetails> = (data) => {
    onSubmit(data);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isPhoneScreen}
      hideBackdrop={isPhoneScreen}
      sx={
        !isPhoneScreen
          ? {
              "& .MuiDialog-paper": {
                width: 1000,
                maxWidth: 1000,
                height: 550,
                borderRadius: 3,
              },
            }
          : {
              marginTop: 8,
              "& .MuiDialog-paper": {
                boxShadow: 0,
              },
            }
      }
    >
      <DialogContent dividers>
        <IconButton
          aria-label="close"
          onClick={!isPhoneScreen ? onClose : onBack}
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
          direction="row"
          justifyContent="space-around"
          height="100%"
          alignContent="center"
        >
          {!isPhoneScreen ? (
            <>
              <Stack justifyContent="space-evenly">
                <Stack spacing={1}>
                  <Typography fontSize={22} fontWeight={550}>
                    Making Payment to:
                  </Typography>
                  <Stack>
                    <Typography fontSize={22} fontWeight={650}>
                      {tutorDetails.firstName} {tutorDetails.lastName}
                    </Typography>
                    <Typography fontSize={15} lineHeight={1.2}>
                      {tutorDetails.phoneNumber}
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <AmountBreakupCard
                    amount={Number(paymentDetails.amount)}
                  ></AmountBreakupCard>
                </Box>
              </Stack>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "90%", alignSelf: "center" }}
              />
            </>
          ) : (
            <></>
          )}
          <Stack
            sx={
              !isPhoneScreen
                ? { justifyContent: "space-around", width: "40%" }
                : {
                    justifyContent: "space-around",
                    width: "95%",
                  }
            }
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
                create session with your tutor
              </Typography>
            </Stack>
            <Stack
              sx={
                !isPhoneScreen
                  ? { height: "45%", justifyContent: "space-around" }
                  : { justifyContent: "space-around", height: "35%" }
              }
              spacing={2}
            >
              <Controller
                name="sessionTitle"
                control={control}
                rules={{ required: "Required" }}
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

              <Stack direction="row" spacing={3}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Add date"
                      value={field?.value}
                      onChange={(newValue) => field?.onChange(newValue)}
                      slots={{
                        textField: (params: TextFieldProps) => (
                          <TextField
                            {...params}
                            size="small" // Reduce the input size
                            error={errors.date !== undefined ? true : false}
                            helperText={errors.date ? "Required" : ""}
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
                      value={field?.value}
                      onChange={(newValue) => field?.onChange(newValue)}
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
                      value={field?.value}
                      onChange={(newValue) => field?.onChange(newValue)}
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

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Description (optional)"
                    variant="outlined"
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
                )}
              />
            </Stack>
            <Box>
              <Button
                variant="contained"
                fullWidth
                disabled={!isValid}
                onClick={handleSubmit(handleFormSubmit)}
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
