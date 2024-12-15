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
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Alert from "@mui/material/Alert";
import TickMark from "../../../assets/images/png/tick-mark.png";
import Link from "@mui/material/Link";
import { trackEvent } from "../../../utils/amplitude";

interface PaymentConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

const PaymentConfirmationDialog = ({
  open,
  onClose,
}: PaymentConfirmationDialogProps) => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isPhoneScreen}
      hideBackdrop={isPhoneScreen}
      sx={
        !isPhoneScreen
          ? {
              "& .MuiDialog-paper": {
                width: 430,
                maxWidth: "50vw",
                height: 580,
                maxHeight: 600,
                borderRadius: 3,
              },
            }
          : {
              marginTop: 8,
              "& .MuiDialog-paper": {
                boxShadow: 0,
              },
            }
      }
    >
      <DialogContent dividers>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          {!isPhoneScreen ? <CloseIcon /> : <CloseIcon />}
        </IconButton>
        <Stack
          sx={
            isPhoneScreen
              ? { justifyContent: "space-between", height: "100%" }
              : {}
          }
        >
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
          {isPhoneScreen && (
            <Stack justifyContent="center" alignItems="center">
              <Typography
                align="center"
                fontWeight={600}
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'none',
                  },
                }}
                onClick={() => {
                  trackEvent("Clicked on Go To Dashboard")
                  onClose();
                }}
              >
                Go To Dashboard
              </Typography>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationDialog;
