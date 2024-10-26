// src/components/OTPDialog.tsx
import React, { forwardRef, useEffect, useState } from "react";
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
  Divider,
  useMediaQuery,
  Slide,
  SlideProps,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
import { PaymentDetails, TutorDetails } from "../interfaces";
import PersonalDetails from "../../../components/PersonalDetails";
interface TutorDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: TutorDetails) => void;
  onBack: () => void;
  tutorDetails: TutorDetails;
  paymentDetails: PaymentDetails;
}
const Transition = forwardRef(function Transition(props: SlideProps, ref) {
  return (
    <Slide
      direction="left"
      ref={ref}
      {...props}
      timeout={{ enter: 300, exit: 300 }}
    >
      {props.children}
    </Slide>
  );
});
const TutorDetailsDialog = ({
  open,
  onClose,
  onSubmit,
  onBack,
  tutorDetails,
  paymentDetails,
}: TutorDetailsDialogProps) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<TutorDetails>({
    mode: "onChange",
    defaultValues: tutorDetails,
  });
  const handleFormSubmit: SubmitHandler<TutorDetails> = (data) => {
    onSubmit(data);
  };

  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={isPhoneScreen ? Transition : undefined}
      hideBackdrop={isPhoneScreen}
      fullScreen={isPhoneScreen}
      PaperProps={{
        style: { transformOrigin: "top right" },
      }}
      sx={
        !isPhoneScreen
          ? {
              "& .MuiDialog-paper": {
                width: 1000,
                maxWidth: 1000,
                height: 600,
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
          direction={!isPhoneScreen ? "row" : "column"}
          height="100%"
          alignContent="center"
          sx={
            !isPhoneScreen
              ? { justifyContent: "space-around" }
              : { justifyContent: "space-between", pt: 4 }
          }
        >
          {!isPhoneScreen ? (
            <Stack justifyContent="space-evenly">
              {!isPhoneScreen ? (
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
              ) : (
                <></>
              )}
              <Box>
                <AmountBreakupCard
                  amount={paymentDetails.amount}
                ></AmountBreakupCard>
              </Box>
            </Stack>
          ) : (
            <></>
          )}
          {!isPhoneScreen ? (
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "90%", alignSelf: "center" }}
            />
          ) : (
            <></>
          )}
          <Stack
            spacing={!isPhoneScreen ? 0 : 5}
            sx={
              !isPhoneScreen
                ? { justifyContent: "space-between", width: "40%", pt: 10 }
                : { width: "100%", height: "100%", pt: 3 }
            }
          >
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Alert
                severity="warning"
                sx={{
                  borderRadius: "14px",
                  width: 350,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 11 }}>
                  Looks like the tutor is not onboarded!
                </Typography>
                <Typography sx={{ fontSize: 11 }}>
                  Onboard them with us now to make the payment
                </Typography>
              </Alert>
            </Box>
            <Stack
              sx={
                !isPhoneScreen
                  ? { justifyContent: "space-around", height: "90%" }
                  : {
                      justifyContent: "space-between",
                      height: "100%",
                    }
              }
            >
              {!isPhoneScreen ? (
                <>
                  {" "}
                  <Stack>
                    <Typography fontSize={23} fontWeight={600} align="center">
                      Tutor Details
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={550}
                      align="center"
                      lineHeight={1.2}
                    >
                      Provide relevant details for their onboarding
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: "First Name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="First Name"
                          variant="outlined"
                          size="small"
                          error={!!errors.firstName}
                          helperText={
                            errors.firstName ? errors.firstName.message : ""
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
                              fontSize: 10,
                            },
                            "& legend": {
                              width: 0,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Last Name"
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
                              fontSize: 10,
                            },
                            "& legend": {
                              width: 0,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="panNumber"
                      control={control}
                      rules={{
                        required: "This field is required",
                        pattern: {
                          value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                          message: "Invalid Pan",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Pan"
                          variant="outlined"
                          size="small"
                          error={!!errors.panNumber}
                          helperText={
                            errors.panNumber ? errors.panNumber.message : ""
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
                              fontSize: 10,
                            },
                            "& legend": {
                              width: 0,
                            },
                          }}
                        />
                      )}
                    />
                  </Stack>
                </>
              ) : (
                <Stack spacing={6}>
                  <Stack>
                    <Typography fontSize={23} fontWeight={600} align="center">
                      Tutor Details
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={550}
                      align="center"
                      lineHeight={1.2}
                    >
                      Provide relevant details for their onboarding
                    </Typography>
                  </Stack>
                  {/* <Stack
                    spacing={!isPhoneScreen ? 5 : 3}
                    width="95%"
                    alignSelf="center"
                    alignItems="center"
                  >
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: "First Name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="First Name"
                          variant="outlined"
                          size="small"
                          error={!!errors.firstName}
                          helperText={
                            errors.firstName ? errors.firstName.message : ""
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
                              fontSize: 10,
                            },
                            "& legend": {
                              width: 0,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Last Name"
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
                              fontSize: 10,
                            },
                            "& legend": {
                              width: 0,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="panNumber"
                      control={control}
                      rules={{
                        required: "This field is required",
                        pattern: {
                          value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                          message: "Invalid Pan",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Pan"
                          variant="outlined"
                          size="small"
                          error={!!errors.panNumber}
                          helperText={
                            errors.panNumber ? errors.panNumber.message : ""
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
                              fontSize: 10,
                            },
                            "& legend": {
                              width: 0,
                            },
                          }}
                        />
                      )}
                    />
                  </Stack> */}
                  <PersonalDetails onSuccess={() => {}} />
                </Stack>
              )}
              {!isPhoneScreen ? (
                <></>
              ) : (
                // <AmountBreakupCard amount={paymentDetails.amount} />
                <></>
              )}
              {/* <Box>
                <Button
                  variant="contained"
                  onClick={handleSubmit(handleFormSubmit)}
                  fullWidth
                  disabled={!isValid}
                  sx={{
                    backgroundColor: "#507FFD",
                    borderRadius: 7,
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  Next
                </Button>
              </Box> */}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TutorDetailsDialog;
