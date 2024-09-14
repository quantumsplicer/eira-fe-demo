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
import TickMark from "../../../assets/images/png/tick-mark.png";
import Link from "@mui/material/Link";

interface PaymentConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

const PaymentConfirmationDialog = ({
  open,
  onClose,
}: PaymentConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 430,
          maxWidth: "50vw",
          height: 580,
          maxHeight: 600,
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
        {/* <Stack justifyContent="center" alignItems="center" spacing={4} pt={6}>
          <Stack justifyContent="center" alignItems="center">
            <Typography sx={{ fontSize: 21 }}>Sent rs 5000 to</Typography>
            <Typography sx={{ fontSize: 21 }}>Suneel Satpal</Typography>
          </Stack>
          <Stack spacing={3} width="90%" p={1.5}>
            <Stack
              direction="row"
              justifyContent="space-between"
              display="flex"
            >
              <Typography sx={{ fontSize: 15 }}>Transaction ID</Typography>
              <Typography sx={{ fontSize: 15 }}>1FEDA785CB576A90</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 15 }}>Account Number</Typography>
              <Typography sx={{ fontSize: 15 }}>1FEDA785CB576A90</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 15 }}>Account Holder</Typography>
              <Typography sx={{ fontSize: 15 }}>1FEDA785CB576A90</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 15 }}>
                {" "}
                Transaction date and time
              </Typography>
              <Typography sx={{ fontSize: 15 }}>1FEDA785CB576A90</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 15 }}>
                Tuition date and time
              </Typography>
              <Typography sx={{ fontSize: 15 }}>1FEDA785CB576A90</Typography>
            </Stack>
          </Stack>
          <Box>
            <img
              src={TickMark}
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          </Box>
          <Link href="#" sx={{ color: "grey", fontSize: 18 }}>
            Create another
          </Link>
        </Stack> */}
        <Stack justifyContent="center" alignItems="center" spacing={6} pt={5}>
          <Stack justifyContent="center" alignItems="center" spacing={1}>
            <Typography fontSize={22} fontWeight={550}>
              Payment Successfull!
            </Typography>
            <Stack justifyContent="center" alignItems="center" spacing={4}>
              <Stack justifyContent="center" alignItems="center">
                <Stack direction="row" spacing={1}>
                  <Typography align="center" fontWeight={550} fontSize={19}>
                    Sent
                  </Typography>
                  <Typography
                    align="center"
                    fontWeight={550}
                    fontSize={19}
                    color="#1F9254"
                  >
                    ₹ 5000
                  </Typography>
                  <Typography align="center" fontWeight={550} fontSize={19}>
                    to
                  </Typography>
                </Stack>
                <Typography fontWeight={550} align="center" fontSize={19}>
                  Suneel Satpal
                </Typography>
              </Stack>
              <Box>
                <img
                  src={TickMark}
                  style={{
                    width: "90px",
                    height: "90px",
                  }}
                />
              </Box>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <Stack direction="row" spacing={1}>
                <Typography
                  align="center"
                  fontSize={14}
                  letterSpacing={0}
                  color="#969696"
                  fontWeight={600}
                >
                  settlement on
                </Typography>
                <Typography
                  align="center"
                  fontSize={14}
                  letterSpacing={0}
                  fontWeight={600}
                >
                  7th January at 5:00pm
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={2} width="85%">
            <Stack
              direction="row"
              justifyContent="space-between"
              display="flex"
            >
              <Typography
                sx={{ fontSize: 13 }}
                color="#969696"
                fontWeight={600}
              >
                Transaction ID
              </Typography>
              <Typography sx={{ fontSize: 13 }}>1FEDA785CB576A90</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: 13 }}
                color="#969696"
                fontWeight={600}
              >
                Account Number
              </Typography>
              <Typography sx={{ fontSize: 13 }} fontWeight={650}>
                1FEDA785CB576A90
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: 13 }}
                color="#969696"
                fontWeight={600}
              >
                Account Holder
              </Typography>
              <Typography sx={{ fontSize: 13 }} fontWeight={650}>
                1FEDA785CB576A90
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: 13 }}
                color="#969696"
                fontWeight={600}
              >
                Transaction date and time
              </Typography>
              <Typography sx={{ fontSize: 13 }} fontWeight={650}>
                1FEDA785CB576A90
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: 13 }}
                color="#969696"
                fontWeight={600}
              >
                Tuition date and time
              </Typography>
              <Typography sx={{ fontSize: 13 }} fontWeight={650}>
                1FEDA785CB576A90
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationDialog;
