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
  useMediaQuery,
  SwipeableDrawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TickMark from "../../../assets/images/png/tick-mark.png";
import Link from "@mui/material/Link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import { PaymentLinkInput } from "../interfaces";
import { trackEvent } from "../../../utils/amplitude";

interface PaymentLinkDialogProps {
  open: boolean;
  onSuccess: () => void;
  onFailure: () => void;
  onClose: () => void;
  onSubmit: (data: PaymentLinkInput) => void;
}

const PaymentLinkDialog = ({
  open,
  onSuccess,
  onFailure,
  onClose,
  onSubmit,
}: PaymentLinkDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<PaymentLinkInput>({
    mode: "onChange",
  });

  const handleOnClose = () => {
    onClose();
  };
  const handleOnSubmit = (data: PaymentLinkInput) => {
    trackEvent("Clicked on Send Payment Link");
    onSubmit(data);
  };

  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [checked, setChecked] = useState<boolean>();

  const handleChange = () => {
    checked ? trackEvent("Unchecked payment link confirmation checkbox") : trackEvent("Checked payment link confirmation checkbox");
    setChecked(!checked);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        trackEvent("Closed Create Payment Link Dialog")
        handleOnClose()
      }}
      fullScreen={isPhoneScreen}
      hideBackdrop={isPhoneScreen}
      sx={
        !isPhoneScreen
          ? {
              "& .MuiDialog-paper": {
                width: 470,
                maxWidth: "50vw",
                maxHeight: 650,
                height: 590,
                borderRadius: 3,
              },
              p: 2,
            }
          : {
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
            isPhoneScreen ? trackEvent("Clicked back from Create Payment Link Dialog") : trackEvent("Closed Create Payment Link Dialog")
            handleOnClose()
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

        <Stack
          sx={
            !isPhoneScreen
              ? { pl: 4, pr: 4, pt: 4 }
              : {
                  height: "100%",
                  justifyContent: "space-evenly",
                }
          }
          spacing={7}
        >
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
          <Stack
            spacing={4}
            sx={
              !isPhoneScreen
                ? { pt: 1 }
                : { width: "90%", alignSelf: "center", alignItems: "center" }
            }
          >
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Invalid Number",
                },
                validate: {
                  notForbidden: (value) =>
                    value !== localStorage.getItem("phoneNumber") ||
                    "Cannot create payment link for your own number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  onBlur={() => {
                    trackEvent("Entered student phone number", {
                      text: field.value
                    })
                    field.onBlur()
                  }}
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
                  onBlur={() => {
                    trackEvent("Entered student email", {
                      text: field.value
                    })
                    field.onBlur();
                  }}
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
                  onBlur={() => {
                    trackEvent("Entered Amount to Pay", {
                      text: field.value
                    })
                    field.onBlur();
                  }}
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
          <Box
            sx={
              !isPhoneScreen
                ? { pt: 1 }
                : { width: "90%", alignSelf: "center", alignItems: "center" }
            }
          >
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
