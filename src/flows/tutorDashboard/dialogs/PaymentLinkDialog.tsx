// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TickMark from "../../../assets/images/png/tick-mark.png";
import Link from "@mui/material/Link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";

type Inputs = {
  phoneNumber: string;
  email: string;
  amount: number;
};

interface PaymentLinkDialogProps {
  activeDialog: string;
  setActiveDialog: (dialog: string) => void;
}

const PaymentLinkDialog = ({
  activeDialog,
  setActiveDialog,
}: PaymentLinkDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const handleOnClose = () => {
    setActiveDialog("None");
  };
  const handleOnSubmit = () => {
    setActiveDialog("ConfirmationDialog");
  };

  const [studentName, setStudentName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>();
  const [checked, setChecked] = useState<boolean>();

  const isPhoneNumberValid = (): boolean => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
  };
  const handleStudentNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentName(event.target.value);
  };
  // const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoneNumber(event.target.value);
  // };
  const handleChange = () => {
    setChecked(!checked);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  return (
    <Dialog
      open={activeDialog === "PaymentLinkDialog" ? true : false}
      onClose={handleOnClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 470,
          maxWidth: "50vw",
          maxHeight: 650,
          height: 590,
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
        <Stack sx={{ pl: 4, pr: 4, pt: 4 }} spacing={7}>
          <Stack justifyContent="center" alignItems="center" sx={{ pt: 0 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
              Create a payment Link
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              create Link to share with your students
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 550,
                color: "#989898",
                pt: 0.5,
                lineHeight: 0.6,
              }}
            >
              Link will be sent to them through whatsapp and text sms
            </Typography>
          </Stack>
          <Stack spacing={4} sx={{ pt: 1 }}>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Invalid Number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={!!errors.phoneNumber}
                  helperText={
                    errors.phoneNumber ? errors.phoneNumber.message : ""
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
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email (optional)"
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
                  InputProps={{
                    startAdornment: (
                      <Typography fontSize={14} sx={{ mr: 1 }}></Typography>
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
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Amount to pay"
                  type="number"
                  variant="outlined"
                  size="small"
                  error={!!errors.amount}
                  helperText={errors.amount ? errors.amount.message : ""}
                  sx={{
                    mb: 0,
                    "& .MuiInputLabel-root": {
                      transform: "translate(0, -6px) scale(0.8)",
                    },
                    "& .MuiInputBase-root": {
                      marginTop: "16px",
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
                      <Typography fontSize={14} sx={{ mr: 1 }}>
                        ₹
                      </Typography>
                    ),
                  }}
                />
              )}
            />
          </Stack>
          <Box sx={{ pt: 1 }}>
            <Stack spacing={2}>
              <FormGroup sx={{ fontSize: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: 10, fontWeight: 550 }}
                      lineHeight={1.3}
                    >
                      I confirm that all these sessions were conducted through
                      Eira and the payment link generated here is for those
                      sessions only
                    </Typography>
                  }
                />
              </FormGroup>
              <Button
                variant="contained"
                onClick={handleSubmit(handleOnSubmit)}
                fullWidth
                disabled={isValid && checked ? false : true}
                sx={{
                  backgroundColor: "#507FFD",
                  borderRadius: 7,
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingLeft: 3,
                  paddingRight: 3,
                  textTransform: "none",
                }}
              >
                Send Payment Link
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default PaymentLinkDialog;
