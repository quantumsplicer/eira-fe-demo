import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
  Drawer,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import { EiraBack1 } from "../../../components/EiraBack1";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import PaymentLinkCard from "../components/PaymentLinkCard";
import UnsettledAmountCard from "../components/UnsettledAmountCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import SessionHistoryTable from "../components/SessionHistoryTable";
const SessionHistory: React.FC = () => {
  return (
    <React.Fragment>
      <Stack spacing={5}>
        <h1>Session History</h1>
        <SessionHistoryTable />
      </Stack>
    </React.Fragment>
  );
};

export default SessionHistory;
