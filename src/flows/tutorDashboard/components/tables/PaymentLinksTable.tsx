import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "../StatusTag";
import { Virtuoso } from "react-virtuoso";
import { useGetPaymentLinksQuery } from "../../../../APIs/definitions/paymentLinks";
import { PaymentLinkDetails } from "../../interfaces";

const lightTheme = createTheme({ palette: { mode: "light" } });

// const data: PaymentLinkDetails[] = [
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "Anagh",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Pending",
//   },
//   {
//     transactionId: "12312412312",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Pending",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Failed",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Failed",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Success but not settled",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Settled",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Settled",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Settled",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Settled",
//   },
//   {
//     transactionId: "123",
//     studentPhoneNumber: "+919997945005",
//     studentName: "today",
//     timeOfPaymentReceived: "today",
//     timeOfSettlement: "today",
//     amount: 4000,
//     paymentMode: "Online",
//     status: "Settled",
//   },
// ];
interface PaymentLinkCellMobileProps {
  name: string;
  phoneNumber: string;
  status: string;
  amount: number;
}
const PaymentLinkCellMobile = ({
  name,
  phoneNumber,
  status,
  amount,
}: PaymentLinkCellMobileProps) => {
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

const PaymentLinksTable: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";

  const columnHelper = createMRTColumnHelper<PaymentLinkDetails>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      enableHiding: false,
    }),
    columnHelper.accessor("receiver_phone", {
      header: "Student's Phone Number",
      enableHiding: false,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableHiding: false,
    }),
    columnHelper.accessor("created", {
      header: "Date of Creation",
      enableHiding: false,
    }),
    columnHelper.accessor("expiry_timestamp", {
      header: "Expires On",
      enableHiding: false,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableHiding: false,
      Cell: ({ cell }) => <StatusTag cellValue={cell.getValue<string>()} />,
    }),
  ];
  const { data, isLoading, isSuccess, isError, error } =
    useGetPaymentLinksQuery();
  const table = useMaterialReactTable({
    columns,
    data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableToolbarInternalActions: false,
    enableTopToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
    enableRowVirtualization: true,
    enableColumnVirtualization: true,
    enablePagination: true,
    initialState: {
      density: "spacious",
    },
    defaultColumn: {
      //allow columns to get larger than default

      size: 40, //make columns wider by default
    },
    muiTableBodyCellProps: () => ({
      //conditionally style pinned columns
      sx: {
        fontSize: 12,
      },
    }),
    muiTableHeadCellProps: () => ({
      //conditionally style pinned columns
      sx: {
        fontSize: 12,
      },
    }),
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.1),
          },
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.2),
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: lighten(baseBackgroundColor, 0.1),
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.2),
          },
        fontSize: 10,
      }),
    },
    muiTableHeadRowProps: () => ({
      //conditionally style pinned columns
      sx: {
        backgroundColor: "#c0c4c4",
        fontSize: 10,
      },
    }),
  });
  return !isPhoneScreen ? (
    <MaterialReactTable table={table} />
  ) : (
    <Virtuoso
      style={{ height: 800 }}
      data={data}
      itemContent={(_, user) => (
        <PaymentLinkCellMobile
          name={user.receiver_phone}
          phoneNumber={user.receiver_phone}
          status={user.status}
          amount={parseInt(user.amount)}
        />
      )}
    />
  );
};

export default PaymentLinksTable;
