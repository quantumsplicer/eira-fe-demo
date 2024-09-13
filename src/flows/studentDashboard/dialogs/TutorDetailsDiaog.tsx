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
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler } from "react-hook-form";
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
    formState: { errors },
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 1000,
          maxWidth: 1000,
          height: 600,
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
          <Stack justifyContent="space-between" width="40%" pt={5}>
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
            <Stack justifyContent="space-around" height="90%">
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
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  {...register("firstName", { required: true })}
                  size="small"
                  error={errors.firstName !== undefined ? true : false}
                  helperText={errors.firstName ? "Required" : ""}
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
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  {...register("lastName", {})}
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
                <TextField
                  fullWidth
                  label="Pan"
                  variant="outlined"
                  {...register("panNumber", {
                    required: true,
                    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                  })}
                  size="small"
                  error={errors.panNumber !== undefined ? true : false}
                  helperText={errors.panNumber ? "Invalid Pan" : ""}
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
              </Stack>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  fullWidth
                  disabled={Object.keys(errors).length === 0 ? false : true}
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
