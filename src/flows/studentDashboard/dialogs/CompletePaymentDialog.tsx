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
  Divider,
  useMediaQuery,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Alert from "@mui/material/Alert";
import { useForm, SubmitHandler } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";

interface CompletePaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  amount: number;
}
const CompletePaymentDialog = ({
  open,
  onClose,
  onSubmit,
  amount,
}: CompletePaymentDialogProps) => {
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
                width: 1000,
                maxWidth: 1000,
                height: 550,
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
          {!isPhoneScreen ? <CloseIcon /> : <ArrowBackIcon />}
        </IconButton>
        <Stack
          direction="row"
          justifyContent="space-around"
          height="100%"
          alignContent="center"
        >
          {!isPhoneScreen ? (
            <>
              <Stack justifyContent="space-evenly">
                <Stack spacing={1}>
                  <Typography fontSize={22} fontWeight={550}>
                    Making Payment to:
                  </Typography>
                  <Stack>
                    <Typography fontSize={22} fontWeight={650}>
                      Suneel Satpal
                    </Typography>
                    <Typography fontSize={15} lineHeight={1.2}>
                      +919997945005
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <AmountBreakupCard amount={amount}></AmountBreakupCard>
                </Box>
              </Stack>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "90%", alignSelf: "center" }}
              />{" "}
            </>
          ) : (
            <></>
          )}
          <Stack
            sx={
              !isPhoneScreen
                ? { justifyContent: "space-between", width: "40%", pt: 5 }
                : { width: "90%" }
            }
          >
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Alert
                severity="warning"
                sx={{
                  borderRadius: "14px",
                  width: 350,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 11 }}>
                  Looks like the tutor is not onboarded!
                </Typography>
                <Typography sx={{ fontSize: 11 }}>
                  Onboard them with us now to make the payment
                </Typography>
              </Alert>
            </Box>
            <Stack
              spacing={!isPhoneScreen ? 0 : 4}
              sx={
                !isPhoneScreen
                  ? { justifyContent: "space-around", height: "90%" }
                  : { justifyContent: "space-around", height: "100%" }
              }
            >
              <Stack spacing={2}>
                <Stack alignItems="center">
                  <Stack direction="row" spacing={1}>
                    <Typography
                      fontSize={23}
                      fontWeight={600}
                      align="center"
                      color="#969696"
                    >
                      paying
                    </Typography>
                    <Typography
                      fontSize={23}
                      fontWeight={600}
                      align="center"
                      color="#1F9254"
                    >
                      ₹ 5,000
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography
                      color="#969696"
                      fontSize={23}
                      fontWeight={600}
                      lineHeight={1.2}
                    >
                      to
                    </Typography>
                    <Typography fontSize={23} fontWeight={650} lineHeight={1.2}>
                      Suneel Satpal
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  fontSize={12}
                  fontWeight={550}
                  align="center"
                  lineHeight={1.2}
                >
                  Confirm payment detials and make payment
                </Typography>
              </Stack>
              <Stack
                sx={
                  !isPhoneScreen
                    ? { justifyContent: "space-evenly", height: "40%" }
                    : { height: "20%", justifyContent: "space-evenly" }
                }
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    sx={{ fontSize: 15 }}
                    color="#969696"
                    fontWeight={600}
                  >
                    Account Holder:
                  </Typography>
                  <Typography sx={{ fontSize: 15 }} fontWeight={600}>
                    Suneel Satpal
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    sx={{ fontSize: 15 }}
                    color="#969696"
                    fontWeight={600}
                  >
                    Tuition date and time
                  </Typography>
                  <Typography sx={{ fontSize: 15 }} fontWeight={600}>
                    5:00pm - 6:00pm
                  </Typography>
                </Stack>
              </Stack>
              {!isPhoneScreen ? <></> : <AmountBreakupCard />}
              <Box>
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  fullWidth
                  sx={{
                    backgroundColor: "#507FFD",
                    borderRadius: 7,
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  Proceed to Pay
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CompletePaymentDialog;