// src/components/OTPDialog.tsx
import React, { useState, useEffect } from "react";
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
import { useForm, SubmitHandler } from "react-hook-form";

interface PaymentDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
type Inputs = {
  phoneNumber: string;
  amount: string;
};

const PaymentDetailsDialog = ({
  open,
  onClose,
  onSubmit,
}: PaymentDetailsDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  console.log("errors");
  console.log(errors);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 450,
          maxWidth: "50vw",
          height: 450,
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
        <Stack sx={{ pl: 4, pr: 4, pt: 4 }} spacing={6}>
          <Stack justifyContent="center" alignItems="center" sx={{ pt: 1 }}>
            <Typography fontSize={23} fontWeight={600}>
              Payment Details
            </Typography>
            <Stack>
              <Typography fontSize={12} fontWeight={550} align="center">
                select a tutor to pay and schedule a session with
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 550,
                  color: "#989898",
                }}
                align="center"
              >
                Link will be sent to them through whatsapp and testSMS
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={5} pt={1}>
            <TextField
              fullWidth
              label="Phone number of the tutor"
              variant="outlined"
              size="small"
              {...register("phoneNumber", { required: true })}
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
              {...register("amount", { required: true })}
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
          <Box>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              fullWidth
              disabled={Object.keys(errors).length === 0 ? false : true}
              sx={{
                backgroundColor: "#507FFD",
                borderRadius: 7,
                fontSize: 17,
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
