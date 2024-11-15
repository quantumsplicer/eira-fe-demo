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
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
import { Loading } from "../../../components/Loading";

const PayFeesContainer: React.FC = () => {
  const { checkCurrentStudentOnboardingState, checkProcessIsLoading } =
    useGetOnboardingDetails();

  useEffect(() => {
    if (window.location.pathname.includes("pay-tuition-fees"))
      localStorage.setItem("activeFlow", "payTuitionFeesFlow");
    else if (window.location.pathname.includes("payment-link"))
      localStorage.setItem("activeFlow", "DynamicLinkFlow");
    else if (window.location.pathname.includes("static-link")) {
      localStorage.setItem("activeFlow", "StaticLinkFlow");
    }
    else localStorage.setItem("activeFlow", "defaultFlow");

    localStorage.setItem("activeFlowUrl", window.location.pathname);
    localStorage.setItem("activeFlowQuery", window.location.search);

    console.log("asdfadsfsadf");
    checkCurrentStudentOnboardingState();
  }, []);

  console.log(checkProcessIsLoading);

  if (checkProcessIsLoading) return <Loading />;

  return <Outlet />;
};

export default PayFeesContainer;
