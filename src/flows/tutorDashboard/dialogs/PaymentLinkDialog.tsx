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
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";

interface PaymentLinkDialogProps {
  activeDialog: string;
  setActiveDialog: (dialog: string) => void;
}

const PaymentLinkDialog = ({
  activeDialog,
  setActiveDialog,
}: PaymentLinkDialogProps) => {
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
          height: 570,
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
        <Stack sx={{ pl: 4, pr: 4, pt: 4 }} spacing={4}>
          <Stack justifyContent="center" alignItems="center" sx={{ pt: 1 }}>
            <Typography sx={{ fontSize: 23, fontWeight: "bold" }}>
              Create a payment Link
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 550, lineHeight: 1.2 }}>
              create Link to share with your students
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 550,
                color: "#989898",
                lineHeight: 1.2,
              }}
            >
              Link will be sent to them through whatsapp and text sms
            </Typography>
          </Stack>
          <Stack spacing={2.3} sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name of the student"
              variant="outlined"
              value={studentName}
              size="small"
              onChange={handleStudentNameChange}
              sx={{
                mb: 0,
                "&:MuiInputBase-input": {
                  fontSize: 7,
                },
              }}
              InputProps={{
                startAdornment: (
                  <Typography fontSize={10} sx={{ mr: 1 }}></Typography>
                ),
              }}
            />
            {/* <TextField
              fullWidth
              label="Phone number"
              variant="outlined"
              size="small"
              value={phoneNumber}
              onChange={handleNumberChange}
              sx={{
                mb: 0,
                "&:MuiInputBase-input": {
                  fontSize: 12,
                },
              }}
              InputProps={{
                startAdornment: (
                  <Typography fontSize={14} sx={{ mr: 1 }}></Typography>
                ),
              }}
            /> */}
            <PhoneNumberInputField
              autoFocus={true}
              label="Phone Number"
              phone={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              onSubmit={() => {}}
            />
            <TextField
              fullWidth
              label="Email (optional)"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              size="small"
              sx={{
                mb: 0,
                "&:MuiInputBase-input": {
                  fontSize: 12,
                },
              }}
              InputProps={{
                startAdornment: (
                  <Typography fontSize={14} sx={{ mr: 1 }}></Typography>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Amount to pay"
              type="number"
              variant="outlined"
              value={amount}
              size="small"
              onChange={handleAmountChange}
              sx={{
                mb: 0,
                "&:MuiInputBase-input": {
                  fontSize: 10,
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
          </Stack>
          <Box sx={{ pt: 1 }}>
            <Stack spacing={1}>
              <FormGroup sx={{ fontSize: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label={
                    <Typography sx={{ fontSize: 10, lineHeight: 1.2 }}>
                      I confirm that all these sessions were conducted through
                      Eira and the payment link generated here is for those
                      sessions only
                    </Typography>
                  }
                />
              </FormGroup>
              <Button
                variant="contained"
                onClick={handleOnSubmit}
                fullWidth
                disabled={
                  !studentName || !isPhoneNumberValid() || !amount || !checked
                    ? true
                    : false
                }
                sx={{
                  backgroundColor: "#507FFD",
                  borderRadius: 7,
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingLeft: 3,
                  paddingRight: 3,
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
