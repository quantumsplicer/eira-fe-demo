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

const OPT_LENGTH = 4;

interface OTPDialogProps {
  open: boolean;
  onClose: () => void;
}

const OTPDialog = ({ open, onClose }: OTPDialogProps) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const handleOTPInput = (e: any) => {
    setOtp((prev) => {
      return prev + e.target.value;
    });
  };

  const handleSubmit = () => {
    navigate("/pay/payment-details")
    onClose()
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 400,
          maxWidth: "50vw",
          height: 300,
        },
        p: 1,
      }}
    >
      <DialogContent dividers>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: "100%", pb: 10 }}
        >
          <Typography fontSize={18} fontWeight="bold">
            Verify Phone Number
          </Typography>
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
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter OTP for phone number verification
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, pt: 2 }}
          >
            {Array.from({ length: OPT_LENGTH }).map((_, index) => (
              <TextField
                variant="outlined"
                sx={{
                  borderRadius: 20,
                }}
                onClick={handleOTPInput}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    padding: 1,
                    width: 40,
                    height: 40,
                  },
                }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{
              position: "absolute",
              bottom: 20,
              width: "80%",
              height: 40,
              borderRadius: 20,
            }}
          >
            Verify OTP
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default OTPDialog;
