// src/components/OTPDialog.tsx
import React, { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  Slide,
  SlideProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PaymentDetails, TutorDetails } from "../interfaces";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
import { error } from "console";
import { LoadingButton } from "@mui/lab";
import { useGetUserDetailsByPhoneQuery } from "../../../APIs/definitions/user";
import { trackEvent } from "../../../utils/amplitude";

const Transition = forwardRef(function Transition(props: SlideProps, ref) {
  return (
    <Slide
      direction="right"
      ref={ref}
      {...props}
      timeout={{ enter: 300, exit: 300 }}
    >
      {props.children}
    </Slide>
  );
});

interface PaymentDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: PaymentDetails) => void;
  tutorDetails?: TutorDetails;
  phoneNumberProp: string;
  isPayeeStudent?: boolean;
  submitButtonIsLoading?: boolean;
  onInputNumber?: (value: string) => void;
}

const PaymentDetailsDialog = ({
  open,
  onClose,
  onSubmit,
  tutorDetails,
  phoneNumberProp,
  isPayeeStudent,
  submitButtonIsLoading,
  onInputNumber,
}: PaymentDetailsDialogProps) => {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<PaymentDetails>({
    mode: "onBlur",
    defaultValues: {
      phoneNumber: phoneNumberProp,
    },
  });
  const [isPayeeStudentError, setIsPayeeStudentError] =
    useState<boolean>(false);
  const handleFormSubmit: SubmitHandler<PaymentDetails> = (data) => {
    trackEvent("Clicked Next")
    onSubmit(data);
  };
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const { data: tutorData } = useGetUserDetailsByPhoneQuery(
    phoneNumberProp as string,
    { skip: !phoneNumberProp }
  );
  useEffect(() => {
    if (isPayeeStudent) {
      setIsPayeeStudentError(true);
    }
  }, [isPayeeStudent]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        trackEvent("Closed Payment Details Dialog");
        onClose()
      }}
      fullScreen={isPhoneScreen}
      hideBackdrop={isPhoneScreen}
      TransitionComponent={isPhoneScreen ? Transition : undefined}
      sx={
        !isPhoneScreen
          ? {
              "& .MuiDialog-paper": {
                width: 450,
                maxWidth: "50vw",
                height: 510,
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
          onClick={() => {
            isPhoneScreen ? trackEvent("Clicked back from Payment Details"): trackEvent("Closed Payment Details Dialog");
            onClose()
          }}
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
        <Stack justifyContent="space-between" height="100%" pt={4}>
          <Stack spacing={isPhoneScreen ? 18 : 0} height="100%">
            <Stack height="20vh" spacing={isPhoneScreen ? 3 : 0}>
              <Stack spacing={isPhoneScreen ? 4 : 0} height="100%">
                <Typography fontSize={23} fontWeight={600} align="center">
                  Payment Details
                </Typography>
                {/* <Stack spacing={isPhoneScreen ? 1 : 0}>
                  <Typography
                    fontSize={isPhoneScreen ? "0.9rem" : 12}
                    fontWeight={550}
                    align="center"
                  >
                    select a tutor to pay and schedule a session with
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: isPhoneScreen ? "0.9rem" : 10,
                      fontWeight: 550,
                      color: "#989898",
                      lineHeight: 1.1,
                    }}
                    align="center"
                  >
                    Tutor will receive a link to pay, through WhatsApp and SMS
                  </Typography>
                </Stack> */}
              </Stack>
              {tutorData?.[0].first_name && tutorData?.[0].last_name && (
                <Stack height="100%">
                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    align="center"
                    pt={0}
                  >
                    You are making a payment to:
                  </Typography>
                  <Typography
                    fontSize={18}
                    fontWeight={500}
                    align="center"
                    pb={!isPhoneScreen ? 5 : 0}
                  >
                    {tutorData?.[0].first_name} {tutorData?.[0].last_name}
                  </Typography>
                </Stack>
              )}
              <Stack
                height={isPhoneScreen ? "50%" : "30%"}
                justifyContent="space-between"
                spacing={isPhoneScreen ? 4 : 4}
                width="85%"
                alignSelf="center"
              >
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: "This field is required",
                    maxLength: {
                      value: 10,
                      message: "Phone number must be 10 digits long",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be 10 digits long",
                    },
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Invalid Number",
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      onBlur={() => {
                        trackEvent("Entered tutor phone number", {
                          text: value
                        })
                        onBlur();
                        setIsPayeeStudentError(false);
                      }}
                      label="Receiver's Phone Number"
                      fullWidth
                      type="number"
                      variant="outlined"
                      size="small"
                      error={!!errors.phoneNumber || isPayeeStudentError}
                      helperText={
                        <Typography
                          sx={{ fontSize: 10, color: "red" }}
                          component="span"
                        >
                          {/* {errors.phoneNumber ? errors.phoneNumber.message : ""}
                          {isPayeeStudent &&
                            "This user is registered as a student"} */}
                          {errors.phoneNumber
                            ? errors.phoneNumber.message
                            : isPayeeStudentError
                            ? "This user is registered as a student"
                            : ""}
                        </Typography>
                      }
                      sx={{
                        mb: 0,
                        "& .MuiInputLabel-root": {
                          transform: "translate(0, -10px) scale(0.8)", // Move the label above
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
                      InputProps={{
                        startAdornment: (
                          <Stack direction={"row"} spacing={1} sx={{ mr: 1 }}>
                            <img
                              src="https://flagcdn.com/w320/in.png"
                              alt="India Flag"
                              style={{ width: 24, height: 18, marginRight: 8 }}
                            />
                            <Typography fontSize={14}>+91</Typography>
                          </Stack>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: "Required",
                    min: { value: 1, message: "Amount must be greater than 0" },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Amount"
                      fullWidth
                      onBlur={() => {
                        trackEvent("Entered amount to pay", {
                          text: field.value
                        })
                        field.onBlur()
                      }}
                      type="number"
                      variant="outlined"
                      size="small"
                      error={!!errors.amount}
                      helperText={errors.amount ? errors.amount.message : ""}
                      sx={{
                        mb: 0,
                        "& .MuiInputLabel-root": {
                          transform: "translate(0, -10px) scale(0.8)", // Move the label above
                        },
                        "& .MuiInputBase-root": {
                          marginTop: "16px", // Add space between label and input box
                        },
                        "&:MuiInputBase-input": {
                          fontSize: 10,
                        },
                        "& legend": {
                          width: 0,
                        },
                      }}
                      InputProps={{
                        inputMode: "numeric",
                        startAdornment: (
                          <Typography fontSize={14} sx={{ mr: 1 }}>
                            ₹
                          </Typography>
                        ),
                      }}
                    />
                  )}
                />
              </Stack>
            </Stack>
            <Stack>
              {isPhoneScreen && <AmountBreakupCard amount={watch("amount")} />}
            </Stack>
          </Stack>
          <Box width="85%" alignSelf="center">
            <LoadingButton
              variant="contained"
              loading={submitButtonIsLoading}
              onClick={handleSubmit(handleFormSubmit)}
              fullWidth
              disabled={!isValid}
              sx={{
                backgroundColor: "#507FFD",
                borderRadius: 7,
                fontSize: 17,
                fontWeight: "bold",
                paddingLeft: 3,
                paddingRight: 3,
              }}
            >
              Next
            </LoadingButton>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
