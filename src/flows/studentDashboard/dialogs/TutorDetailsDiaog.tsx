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
  Divider,
  useMediaQuery,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";

interface TutorDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  amount: number;
}
type Inputs = {
  firstName: string;
  lastName: string;
  panNumber: string;
};

const TutorDetailsDialog = ({
  open,
  onClose,
  onSubmit,
  amount,
}: TutorDetailsDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handlePanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPanNumber(event.target.value);
  };
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <Dialog
      open={open}
      onClose={onClose}
      hideBackdrop={isPhoneScreen}
      fullScreen={isPhoneScreen}
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
        <Stack
          direction={!isPhoneScreen ? "row" : "column"}
          height="100%"
          alignContent="center"
          sx={
            !isPhoneScreen
              ? { justifyContent: "space-around" }
              : { justifyContent: "space-between" }
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
                      Suneel Satpal
                    </Typography>
                    <Typography fontSize={15} lineHeight={1.2}>
                      +919997945005
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <></>
              )}
              <Box>
                <AmountBreakupCard amount={amount}></AmountBreakupCard>
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
                ? { justifyContent: "space-between", width: "40%", pt: 5 }
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
                  <Stack
                    spacing={5}
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
                  </Stack>
                </Stack>
              )}
              <Box>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
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
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TutorDetailsDialog;
