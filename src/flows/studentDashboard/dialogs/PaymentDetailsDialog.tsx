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
import { PaymentDetails } from "../interfaces";
import { error } from "console";
import { LoadingButton } from "@mui/lab";

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
  phoneNumberProp: string;
  isPayeeStudent?: boolean;
  submitButtonIsLoading?: boolean;
}

const PaymentDetailsDialog = ({
  open,
  onClose,
  onSubmit,
  phoneNumberProp,
  isPayeeStudent,
  submitButtonIsLoading,
}: PaymentDetailsDialogProps) => {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<PaymentDetails>({
    defaultValues: {
      phoneNumber: phoneNumberProp,
    },
  });
  const handleFormSubmit: SubmitHandler<PaymentDetails> = (data) => {
    onSubmit(data);
  };
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    console.log(
      "This is the phone number from payment details dialog",
      phoneNumberProp
    );
  }, [phoneNumberProp]);
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          onClick={onClose}
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
        <Stack justifyContent="space-around" height="100%" pt={4}>
          <Stack>
            <Typography fontSize={23} fontWeight={600} align="center">
              Payment Details
            </Typography>
            <Stack>
              <Typography fontSize={12} fontWeight={550} align="center">
                select a tutor to pay and schedule a session with
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 550,
                  color: "#989898",
                  lineHeight: 1.1,
                }}
                align="center"
              >
                Link will be sent to them through whatsapp and testSMS
              </Typography>
            </Stack>
          </Stack>
          <Stack
            height="45%"
            justifyContent="space-evenly"
            width="85%"
            alignSelf="center"
          >
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "This field is required",
                maxLength: 10,
                minLength: 10,
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
                  onBlur={onBlur}
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={!!errors.phoneNumber || isPayeeStudent}
                  helperText={
                    <Typography
                      sx={{ fontSize: 10, color: "red" }}
                      component="span"
                    >
                      {errors.phoneNumber ? errors.phoneNumber.message : ""}
                      {isPayeeStudent && "This user is registered as a student"}
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
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  fullWidth
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
