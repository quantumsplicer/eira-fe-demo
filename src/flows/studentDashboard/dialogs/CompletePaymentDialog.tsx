// src/components/OTPDialog.tsx
import React, { useMemo, useState } from "react";
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
import { PaymentDetails, SessionDetails, TutorDetails } from "../interfaces";
import { useGetUserDetailsByPhoneQuery } from "../../../APIs/definitions/user";
import { useGetOnboardingStatusQuery } from "../../../APIs/definitions/onboarding";
import moment from "moment";
import GetHelp from "../../../components/GetHelp";
import { trackEvent } from "../../../utils/amplitude";

interface CompletePaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onBack: () => void;
  errorMessage: string|null;
}
const CompletePaymentDialog = ({
  open,
  onClose,
  onSubmit,
  onBack,
  errorMessage
}: CompletePaymentDialogProps) => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  const activePaymentAmount = localStorage.getItem("activePaymentAmount");
  const activePaymentTutorName = localStorage.getItem("activePaymentTutorName");
  const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");
  const activePaymentTutorPhoneNumber = localStorage.getItem(
    "activePaymentTutorPhoneNumber"
  );

  const { data: tutorData } = useGetUserDetailsByPhoneQuery(
    activePaymentTutorPhoneNumber ?? "",
    {
      skip: !activePaymentTutorPhoneNumber,
    }
  );

  const { data: tutorOnboardingStatus } = useGetOnboardingStatusQuery(
    tutorData?.[0]?.id as string,
    {
      skip: !tutorData?.[0]?.id,
    }
  );

  const tutorIsSubMerchant = useMemo(
    () => tutorData?.[0]?.onboarding_status === "COMPLETE",
    [tutorData]
  );

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
          onClick={!isPhoneScreen ? onClose : onBack}
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
                      {activePaymentTutorName}
                    </Typography>
                    <Typography fontSize={15} lineHeight={1.2}>
                      {activePaymentTutorPhoneNumber}
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <AmountBreakupCard amount={Number(activePaymentAmount)} />
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
            {tutorOnboardingStatus && (
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
            )}
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
                      Paying
                    </Typography>
                    <Typography
                      fontSize={23}
                      fontWeight={600}
                      align="center"
                      color="#1F9254"
                    >
                      ₹{activePaymentAmount}
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
                      {activePaymentTutorName ||
                        `+91 ${activePaymentTutorPhoneNumber}`}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  fontSize={12}
                  fontWeight={550}
                  align="center"
                  lineHeight={1.2}
                >
                  Confirm payment details and make payment
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
                  <Stack direction="column" alignItems={"flex-end"}>
                    <Typography sx={{ fontSize: 15 }} fontWeight={600}>
                      {activePaymentTutorName}
                    </Typography>
                    {activePaymentTutorId && (
                      <Typography
                        sx={{ fontSize: 15, alignSelf: "flex-end" }}
                        fontWeight={600}
                      >
                        {`+91 ${activePaymentTutorId}`}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                {false && !tutorIsSubMerchant && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 15 }}
                      color="#969696"
                      fontWeight={600}
                    >
                      Tuition date and time:
                    </Typography>
                    <Stack alignItems={"flex-end"} direction="column">
                      <Typography sx={{ fontSize: 15 }} fontWeight={600}>
                        {`${moment(`${""}`).format("MMMM D, YYYY")}`}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }} fontWeight={600}>
                        {`${moment(`${""}`).format("h:mm A z")} - ${moment(
                          `${""}`
                        ).format("h:mm A z")}`}
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </Stack>

              {!isPhoneScreen ? (
                <></>
              ) : (
                <AmountBreakupCard amount={Number(activePaymentAmount)} />
              )}

              <Box>
                {errorMessage && (
                  <Typography fontSize={14} color={"red"} textAlign={"center"} mb={2}>
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  onClick={() => {
                    trackEvent("Clicked on Proceed to Pay")
                    onSubmit()
                  }}
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
              <Stack alignItems={"center"}>
                <GetHelp />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CompletePaymentDialog;
