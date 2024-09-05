// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { useForm, SubmitHandler } from "react-hook-form";

interface CompletePaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const CompletePaymentDialog = ({
  open,
  onClose,
  onSubmit,
}: CompletePaymentDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 500,
          maxWidth: "50vw",
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
        <Stack justifyContent="center" alignItems="center" pt={6}>
          <Box>
            <Alert
              severity="warning"
              sx={{
                width: "400px",
                borderRadius: "14px",
                fontSize: 13,
                pl: 6,
                pt: 1,
                pr: 2,
              }}
            >
              <Typography sx={{ fontSize: 12 }}>
                Looks like the tutor is not onboarded!
              </Typography>{" "}
              <Typography sx={{ fontSize: 12 }}>
                Onboard them with us now to make the payment
              </Typography>
            </Alert>
          </Box>
        </Stack>
        <Stack justifyContent="center" alignItems="center" spacing={6} pt={3}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Stack>
              <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
                paying rs 5000
              </Typography>
              <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
                to Suneel Satpal
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 15, fontWeight: 550 }}>
              confirm payment details and make payments
            </Typography>
          </Stack>
          <Stack spacing={2} width="80%" p={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              display="flex"
            >
              <Typography sx={{ fontSize: 15 }}>Account Number</Typography>
              <Typography sx={{ fontSize: 15 }}>**** **** **** 2150</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 15 }}>Account Holder:</Typography>
              <Typography sx={{ fontSize: 15 }}>Suneel Satpal</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 15 }}>
                Tuition date and time
              </Typography>
              <Typography sx={{ fontSize: 15 }}>5:00pm - 6:00pm</Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              backgroundColor: "#507FFD",
              borderRadius: 7,
              fontSize: 15,
              fontWeight: "bold",
              height: 45,
              width: "80%",
            }}
          >
            Proceed to pay
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CompletePaymentDialog;
