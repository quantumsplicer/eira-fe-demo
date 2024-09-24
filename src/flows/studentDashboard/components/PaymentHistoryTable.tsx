import React from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "../../tutorDashboard/components/StatusTag";
import PaymentHistoryTableMobile from "../../tutorDashboard/components/PaymentHistoryTableMobile";
import { Virtuoso } from "react-virtuoso";
const lightTheme = createTheme({ palette: { mode: "light" } });
interface Person {
  title: string;
  tutorPhoneNumber: string;
  timeOfSession: string;
  repeat: string;
  amount: number;
  paymentStatus: string;
}
const data: Person[] = [
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
  {
    title: "Math's Class",
    tutorPhoneNumber: "+919997945005",
    timeOfSession: "5:53pm on 13/05/2024",
    repeat: "Daily",
    amount: 2000,
    paymentStatus: "Pending",
  },
];

const PaymentHistoryTable: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";

  const columnHelper = createMRTColumnHelper<Person>();
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      id: "title",
      enableHiding: false,
    }),
    columnHelper.accessor("tutorPhoneNumber", {
      header: "Tutor's Phone Number",
      enableHiding: false,
    }),
    columnHelper.accessor("timeOfSession", {
      header: "Date & Time of Session",
      enableHiding: false,
    }),
    columnHelper.accessor("repeat", {
      header: "Repeat",
      enableHiding: false,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableHiding: false,
    }),
    columnHelper.accessor("paymentStatus", {
      header: "Payment Status",
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
                <Typography sx={{ fontSize: 17, fontWeight: "bold" }}>
                  Payment History
                </Typography>
              </Box>
            </Stack>
            {!isPhoneScreen ? (
              <MaterialReactTable table={table} />
            ) : (
              <Virtuoso
                style={{ height: 400 }}
                data={data}
                itemContent={(_, user) => (
                  <PaymentHistoryTableMobile
                    name={user.title}
                    phoneNumber={user.tutorPhoneNumber}
                    status={user.paymentStatus}
                    amount={user.amount}
                  />
                )}
              />
            )}
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default PaymentHistoryTable;
