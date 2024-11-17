// src/components/OTPDialog.tsx
import React, { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  useMediaQuery,
  Slide,
  SlideProps,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
import { PaymentDetails, TutorDetails } from "../interfaces";
import PersonalDetails from "../../../components/PersonalDetails";

interface TutorDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: TutorDetails) => void;
  onBack: () => void;
}

const Transition = forwardRef(function Transition(props: SlideProps, ref) {
  return (
    <Slide
      direction="left"
      ref={ref}
      {...props}
      timeout={{ enter: 300, exit: 300 }}
    >
      {props.children}
    </Slide>
  );
});
const TutorDetailsDialog = ({
  open,
  onClose,
  onSubmit,
  onBack,
}: TutorDetailsDialogProps) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<TutorDetails>({
    mode: "onChange",
  });
  const handleFormSubmit: SubmitHandler<TutorDetails> = (data) => {
    onSubmit(data);
  };
  const tutorName = localStorage.getItem("activePaymentTutorName");
  const tutorPhoneNumber = localStorage.getItem(
    "activePaymentTutorPhoneNumber"
  );
  const amount = localStorage.getItem("activePaymentAmount");
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={isPhoneScreen ? Transition : undefined}
      hideBackdrop={isPhoneScreen}
      fullScreen={isPhoneScreen}
      PaperProps={{
        style: { transformOrigin: "top right" },
      }}
      sx={
        !isPhoneScreen
          ? {
              "& .MuiDialog-paper": {
                width: 1000,
                maxWidth: 1000,
                height: 600,
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
          direction={!isPhoneScreen ? "row" : "column"}
          height="100%"
          alignContent="center"
          sx={
            !isPhoneScreen
              ? { justifyContent: "space-around" }
              : { justifyContent: "space-between", pt: 4 }
          }
        >
          {!isPhoneScreen ? (
            <Stack justifyContent="space-evenly">
              {!isPhoneScreen ? (
                <Stack spacing={1}>
                  <Typography fontSize={22} fontWeight={550}>
                    Making Payment to:
                  </Typography>
                  <Stack>
                    <Typography fontSize={22} fontWeight={650}>
                      {tutorName}
                    </Typography>
                    <Typography fontSize={15} lineHeight={1.2}>
                      {tutorPhoneNumber}
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <></>
              )}
              <Box>
                <AmountBreakupCard amount={Number(amount)}></AmountBreakupCard>
              </Box>
            </Stack>
          ) : (
            <></>
          )}
          {!isPhoneScreen ? (
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "90%", alignSelf: "center" }}
            />
          ) : (
            <></>
          )}
          <Stack
            spacing={!isPhoneScreen ? 2 : 5}
            sx={
              !isPhoneScreen
                ? { justifyContent: "space-between", width: "40%", pt: 6 }
                : { width: "100%", height: "100%", pt: 3 }
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
                <Typography sx={{ fontSize: 9 }}>
                  Looks like the tutor is not onboarded!
                </Typography>
                <Typography sx={{ fontSize: 9 }}>
                  Onboard them with us now to make the payment
                </Typography>
              </Alert>
            </Box>
            <Stack
              sx={
                !isPhoneScreen
                  ? { justifyContent: "space-around", height: "90%" }
                  : {
                      justifyContent: "space-between",
                      height: "100%",
                    }
              }
            >
              <Stack spacing={6}>
                <Stack>
                  <Typography fontSize={23} fontWeight={600} align="center">
                    Tutor Details
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={550}
                    align="center"
                    lineHeight={1.2}
                  >
                    Provide relevant details for their onboarding
                  </Typography>
                </Stack>
                <PersonalDetails onSuccess={handleSubmit(handleFormSubmit)} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TutorDetailsDialog;
