import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
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
import { Virtuoso } from "react-virtuoso";
import PaymentHistoryTableMobile from "./PaymentHistoryTableMobile";

const lightTheme = createTheme({ palette: { mode: "light" } });
interface Person {
  transactionId: string;
  studentPhoneNumber: string;
  studentName: string;
  timeOfPaymentReceived: string;
  timeOfSettlement: string;
  amount: number;
  paymentMode: string;
  status: string;
}
const data: Person[] = [
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "Anagh",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Pending",
  },
  {
    transactionId: "12312412312",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Pending",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Failed",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Failed",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Success but not settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    studentName: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
];

const PaymentHistoryTable: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [activeDialog, setActiveDialog] = useState<string>("None");
  const heading = "Link Successfully Created";
  const subHeading =
    "your payment link is created and sent to the student on their whatsapp and SMS";
  const openDialog = () => {
    setActiveDialog("PaymentLinkDialog");
  };

  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";

  const columnHelper = createMRTColumnHelper<Person>();
  const columns = [
    columnHelper.accessor("transactionId", {
      header: "Transaction ID",
      enableHiding: false,
    }),
    columnHelper.accessor("studentPhoneNumber", {
      header: "Student's Phone Number",
      enableHiding: false,
    }),
    columnHelper.accessor("studentName", {
      header: "Student Name",
      enableHiding: false,
    }),
    columnHelper.accessor("timeOfPaymentReceived", {
      header: "Date of Payment Received",
      enableHiding: false,
    }),
    columnHelper.accessor("timeOfSettlement", {
      header: "Date and Time of Settlement",
      enableHiding: false,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableHiding: false,
    }),
    columnHelper.accessor("paymentMode", {
      header: "Payment Mode",
      enableHiding: false,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableHiding: false,
      Cell: ({ cell }) => <StatusTag cellValue={cell.getValue<string>()} />,
    }),
  ];

  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Box
          height="fullheight"
          width="fullwidth"
          my={4}
          gap={4}
          p={2}
          sx={
            !isPhoneScreen
              ? { boxShadow: 8, backgroundColor: "white", borderRadius: 2 }
              : { backgroundColor: "white" }
          }
        >
          <Stack spacing={2}>
            <Stack direction="row">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between", // Distribute space between children
                  width: "100%", // Ensure the Box takes full width of its parent
                  padding: 2, // Optional: Adjust padding as needed
                }}
              >
                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Payment History
                </Typography>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  sx={
                    !isPhoneScreen
                      ? {
                          backgroundColor: "#507FFD",
                          borderRadius: 3,
                          fontSize: 13,
                          fontWeight: "bold",
                          height: 45,
                          paddingLeft: 3,
                          paddingRight: 3,
                          textTransform: "none",
                        }
                      : {
                          backgroundColor: "#507FFD",
                          borderRadius: 5,
                          fontSize: 13,
                          fontWeight: "bold",
                          height: 45,
                          paddingLeft: 3,
                          paddingRight: 3,
                          textTransform: "none",
                        }
                  }
                >
                  Create a Payment Link
                </Button>
              </Box>
            </Stack>
            {!isPhoneScreen ? (
              <MaterialReactTable table={table} />
            ) : (
              <Virtuoso
                style={{ height: 800 }}
                data={data}
                itemContent={(_, user) => (
                  <PaymentHistoryTableMobile
                    name={user.studentName}
                    phoneNumber={user.studentPhoneNumber}
                    status={user.status}
                    amount={user.amount}
                  />
                )}
              />
            )}
          </Stack>
        </Box>
      </ThemeProvider>
      <PaymentLinkDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
      <ConfirmationDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
        heading={heading}
        subHeading={subHeading}
      />
    </>
  );
};

export default PaymentHistoryTable;
