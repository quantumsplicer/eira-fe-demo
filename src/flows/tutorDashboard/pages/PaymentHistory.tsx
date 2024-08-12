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
import CreatePaymentLinkDialog from "../dialogs/CreatePaymentLinkDialog";

const PaymentHistory: React.FC = () => {
  return (
    <React.Fragment>
      <Stack spacing={5}>
        <h1>Payments</h1>
        <Stack direction="row" spacing={5}>
          <PaymentLinkCard />
          <UnsettledAmountCard />
        </Stack>
        <PaymentHistoryTable />
      </Stack>
    </React.Fragment>
  );
};

export default PaymentHistory;
