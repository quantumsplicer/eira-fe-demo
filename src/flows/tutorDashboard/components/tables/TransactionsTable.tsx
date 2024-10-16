import React, { useMemo, useState } from "react";
import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "../StatusTag";
import { Virtuoso } from "react-virtuoso";
import { Transaction } from "../../interfaces";
import { useGetTransactionsListQuery } from "../../../../APIs/definitions/transactionsList";

// const data: Transaction[] = [
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
// ];

interface TransactionCellMobileProps {
  name: string;
  phoneNumber: string;
  amount: number;
  status: string;
}
const TransactionCellMobile = ({
  name,
  phoneNumber,
  amount,
  status,
}: TransactionCellMobileProps) => {
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
const TransactionsTable: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";

  const columnHelper = createMRTColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor("id", {
      header: "Transaction ID",
      enableHiding: false,
    }),
    columnHelper.accessor("student_phone", {
      header: "Student's Phone Number",
      enableHiding: false,
    }),
    columnHelper.accessor("student_name", {
      header: "Student Name",
      enableHiding: false,
    }),
    columnHelper.accessor("created", {
      header: "Date of Payment Received",
      enableHiding: false,
    }),
    columnHelper.accessor("settlement_timestamp", {
      header: "Date and Time of Settlement",
      enableHiding: false,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableHiding: false,
    }),
    columnHelper.accessor("payment_mode", {
      header: "Payment Mode",
      enableHiding: false,
    }),
    columnHelper.accessor("settlement_status", {
      header: "Status",
      enableHiding: false,
      Cell: ({ cell }) => <StatusTag cellValue={cell.getValue<string>()} />,
    }),
  ];
  const { data, isLoading, isSuccess, isError, error } =
    useGetTransactionsListQuery();
  const table = useMaterialReactTable({
    columns,
    data: data?.results || [],
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
      size: 40,
    },
    muiTableBodyCellProps: () => ({
      sx: {
        fontSize: 12,
      },
    }),
    muiTableHeadCellProps: () => ({
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
      style={{ height: "50vh" }}
      data={data?.results || []}
      itemContent={(_, user) => (
        <TransactionCellMobile
          name={user.student_name}
          phoneNumber={user.student_phone}
          status={user.settlement_status}
          amount={user.amount}
        />
      )}
    />
  );
};

export default TransactionsTable;
