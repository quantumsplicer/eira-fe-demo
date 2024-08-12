import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import CreatePaymentLinkDialog from "../dialogs/CreatePaymentLinkDialog";
const lightTheme = createTheme({ palette: { mode: "light" } });
interface Person {
  transactionId: string;
  studentPhoneNumber: string;
  linkCreationDate: string;
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
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Pending",
  },
  {
    transactionId: "12312412312",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Pending",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Failed",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Failed",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Success but not settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
  {
    transactionId: "123",
    studentPhoneNumber: "+919997945005",
    linkCreationDate: "today",
    timeOfPaymentReceived: "today",
    timeOfSettlement: "today",
    amount: 4000,
    paymentMode: "Online",
    status: "Settled",
  },
];
const PaymentHistoryTable: React.FC = () => {
  const [createPaymentLinkDialog, setCreatePaymentLinkDialog] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleClosePaymentLinkDialog = () => {
    setCreatePaymentLinkDialog(false);
  };
  const handleOpenPaymentLinkDialog = () => {
    setCreatePaymentLinkDialog(true);
  };
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "transactionId", //simple recommended way to define a column
        header: "Transaction ID",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "studentPhoneNumber", //simple recommended way to define a column
        header: "Student's Phone Number",
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "linkCreationDate", //simple recommended way to define a column
        header: "Link Creation Date",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "timeOfPaymentReceived", //simple recommended way to define a column
        header: "Date of Payment Received",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "timeOfSettlement", //simple recommended way to define a column
        header: "Date and Time of Settlement",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "amount", //simple recommended way to define a column
        header: "Amount",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "paymentMode", //simple recommended way to define a column
        header: "Payment Mode",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "status", //simple recommended way to define a column
        header: "Status",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue<string>() === "Failed"
                  ? "#FBE7E8"
                  : cell.getValue<string>() === "Pending"
                  ? "#FEF2E5"
                  : "#EBF9F1",
              borderRadius: "1rem",
              color:
                cell.getValue<string>() === "Failed"
                  ? "#A30D11"
                  : cell.getValue<string>() === "Pending"
                  ? "#CD6200"
                  : "#3BB900",
              p: "0.5rem",
              width: "fullwidht",
            })}
          >
            {cell.getValue<string>()}
          </Box>
        ),
      },
    ],
    []
  );
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
    <React.Fragment>
      <ThemeProvider theme={lightTheme}>
        <Box
          height="fullheight"
          width="fullwidth"
          my={4}
          gap={4}
          p={2}
          sx={{ boxShadow: 8, backgroundColor: "white", borderRadius: 2 }}
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
                <Typography sx={{ fontSize: 17, fontWeight: "bold" }}>
                  Payment History
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleOpenPaymentLinkDialog}
                  sx={{
                    backgroundColor: "#507FFD",
                    borderRadius: 3,
                    fontSize: 13,
                    fontWeight: "bold",
                    height: 45,
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  Create a Payment Link
                </Button>
              </Box>
            </Stack>
            <MaterialReactTable table={table} />
          </Stack>
        </Box>
      </ThemeProvider>
      <CreatePaymentLinkDialog
        openForm={createPaymentLinkDialog}
        closeForm={handleClosePaymentLinkDialog}
        openConfirmation={openConfirmation}
        closeConfirmation={handleCloseConfirmation}
        openConfirmationPage={handleOpenConfirmation}
      />
    </React.Fragment>
  );
};

export default PaymentHistoryTable;
