// src/components/OTPDialog.tsx
import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const OPT_LENGTH = 4;

interface OTPDialogProps {
  open: boolean;
  onClose: () => void;
}

const OTPDialog = ({ open, onClose }: OTPDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Verify Phone Number
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
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter OTP for phone number verification
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {Array.from({ length: OPT_LENGTH }).map((_, index) => (
            <TextField
              variant="outlined"
              sx={{
                borderRadius: 20,
              }}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} fullWidth>
          Verify OTP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OTPDialog;
