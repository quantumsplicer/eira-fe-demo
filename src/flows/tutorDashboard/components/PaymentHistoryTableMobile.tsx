import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography, Divider } from "@mui/material";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "./StatusTag";
import PaymentLinkDialog from "../dialogs/PaymentLinkDialog";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
const lightTheme = createTheme({ palette: { mode: "light" } });

interface PaymentHistoryTableMobileProps {
  name: string;
  phoneNumber: string;
  amount: number;
  status: string;
}
const PaymentHistoryTableMobile = ({
  name,
  phoneNumber,
  amount,
  status,
}: PaymentHistoryTableMobileProps) => {
  return (
    <Box
      sx={{
        border: "0.2px solid",
        borderRadius: 4,
        borderColor: "#C3C3C3",
        p: 2,
        marginBottom: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "95%",
              alignSelf: "center",
              borderWidth: 2.5,
              borderColor: "#2AC426",
            }}
          />
          <Stack>
            <Typography fontSize={18}>{name}</Typography>
            <Typography fontSize={14} color="#C3C3C3">
              {phoneNumber}
            </Typography>
          </Stack>
        </Stack>
        <Stack pr={2}>
          <Typography fontSize={19} fontWeight={500} textAlign="right">
            ₹ {amount}
          </Typography>
          <Typography fontSize={14} color="#C3C3C3" textAlign="right">
            {status}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PaymentHistoryTableMobile;
