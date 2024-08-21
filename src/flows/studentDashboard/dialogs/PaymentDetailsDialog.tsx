// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PaymentDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const PaymentDetailsDialog = ({
  open,
  onClose,
  onSubmit,
}: PaymentDetailsDialogProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>();

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 500,
          maxWidth: "50vw",
          height: 500,
          borderRadius: 3,
        },
        p: 2,
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
        <Stack sx={{ pl: 4, pr: 4, pt: 5 }} spacing={8}>
          <Stack justifyContent="center" alignItems="center" sx={{ pt: 1 }}>
            <Typography sx={{ fontSize: 23, fontWeight: "bold" }}>
              Payment Details
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 550 }}>
              select a tutor to pay and schedule a session with
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 550,
                color: "#989898",
                lineHeight: 1.2,
              }}
            >
              Link will be sent to them through whatsapp and testSMS
            </Typography>
          </Stack>
          <Stack spacing={4} sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Phone number of the tutor"
              variant="outlined"
              size="small"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
              size="small"
              value={amount}
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
            <Button
              variant="contained"
              onClick={onSubmit}
              fullWidth
              disabled={!phoneNumber || !amount ? true : false}
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
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
