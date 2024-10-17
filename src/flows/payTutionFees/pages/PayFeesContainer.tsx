// src/components/InputPaymentDetails.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import NoteBox from "../../../components/NoteBox";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import { useCheckInvitationAcceptanceQuery } from "../../../APIs/definitions/invitations";
import SafeLogo from "../../../components/SafeLogo";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
import {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
} from "../../../APIs/definitions/user";
import useGetOnboardingDetails from "../../../hooks/useGetOnboardingDetails";

const PayFeesContainer: React.FC = () => {
  const { checkCurrentStudentOnboardingState } =
    useGetOnboardingDetails();

  useEffect(() => {
    console.log("asdfadsfsadf")
    checkCurrentStudentOnboardingState();
  }, []);

  return <Outlet />;
};

export default PayFeesContainer;
