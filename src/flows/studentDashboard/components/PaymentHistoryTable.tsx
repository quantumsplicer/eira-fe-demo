import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "../../tutorDashboard/components/StatusTag";
import { Virtuoso } from "react-virtuoso";
import PaymentInfo from "../../../components/PaymentInfo";
import CloseIcon from "@mui/icons-material/Close";
import { useGetTransactionsListQuery } from "../../../APIs/definitions/transactionsList";
import PaymentFlow from "./PaymentFlow";
import { PaymentDetails, TutorDetails } from "../interfaces";
import { Transaction } from "../../tutorDashboard/interfaces";
import { PaymentItemDrawer } from "./PaymentItemDrawer";

const lightTheme = createTheme({ palette: { mode: "light" } });

interface PaymentHistoryTableMobileProps {
  transactionDetails: Transaction;
}

const PaymentHistoryTableMobile = ({
  transactionDetails,
}: PaymentHistoryTableMobileProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Button
      sx={{
        border: "0.2px solid",
        borderRadius: 4,
        borderColor: "#C3C3C3",
        p: 2,
        marginBottom: 2,
        width: "100%",
        textTransform: "none",
        color: "inherit",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
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
            <Typography fontSize={18}>
              {transactionDetails.tutor_name}
            </Typography>
            <Typography fontSize={14} color="#C3C3C3">
              {transactionDetails.tutor_phone}
            </Typography>
          </Stack>
        </Stack>
        <Stack pr={2}>
          <Typography fontSize={19} fontWeight={500} textAlign="right">
            ₹ {transactionDetails.amount}
          </Typography>
          <Typography fontSize={14} color="#C3C3C3" textAlign="right">
            {transactionDetails.status}
          </Typography>
        </Stack>
      </Stack>

      {isDrawerOpen && (
        <PaymentItemDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          transaction={transactionDetails}
        />
      )}
    </Button>
  );
};

const PaymentHistoryTable: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const { data: transactionDetails } = useGetTransactionsListQuery();
  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";

  const columnHelper = createMRTColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      id: "id",
      enableHiding: false,
    }),
    columnHelper.accessor("student_phone", {
      header: "Tutor's Phone Number",
      enableHiding: false,
    }),
    columnHelper.accessor("created", {
      header: "Date & Time of Session",
      enableHiding: false,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableHiding: false,
    }),
    columnHelper.accessor("status", {
      header: "Payment Status",
      enableHiding: false,
      Cell: ({ cell }) => <StatusTag cellValue={cell.getValue<string>()} />,
    }),
  ];

  const table = useMaterialReactTable({
    columns,
    data: transactionDetails?.results || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
  const tutorDetails: TutorDetails = {
    firstName: "",
    lastName: "",
    panNumber: "",
    phoneNumber: "",
  };
  const [paymentFlowActive, setPaymentFlowActive] = useState(false);
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
            ) : transactionDetails?.results &&
              transactionDetails?.results.length > 0 ? (
              <Virtuoso
                style={{ height: 740 }}
                data={transactionDetails?.results}
                itemContent={(_, user) => (
                  <PaymentHistoryTableMobile transactionDetails={user} />
                )}
              />
            ) : (
              <>
                <Box
                  sx={{
                    minHeight: "30vh",
                    height: "fullheight",
                    backgroundColor: "#ebedf0",
                    borderRadius: 4,
                  }}
                >
                  <Stack
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{
                      height: "30vh",
                    }}
                  >
                    <Typography
                      fontSize="1.1rem"
                      color="#b8bbbf"
                      textAlign="center"
                    >
                      Payments made by you will appear here
                    </Typography>
                    <Stack direction="column" spacing={2}>
                      <Typography
                        fontSize={"0.7rem"}
                        color="#b8bbbf"
                        sx={{ fontStyle: "italic" }}
                        textAlign="center"
                      >
                        Pay via credit right now !
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setPaymentFlowActive(true)}
                        sx={{
                          backgroundColor: "#507FFD",
                          borderRadius: 2,
                          fontSize: "0.7rem",
                          width: "12rem",
                          fontWeight: "bold",
                          height: 40,
                          paddingLeft: 1,
                          paddingRight: 1,
                          textTransform: "none",
                          alignSelf: "center",
                        }}
                      >
                        Make a Payment
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
                {/* <SendPaymentLinkFlow
                isActive={paymentLinkFlowActive}
                          onClose={() => setPaymentLinkFlowActive(false)}
                /> */}
                <PaymentFlow
                  open={paymentFlowActive}
                  onClose={() => setPaymentFlowActive(false)}
                  tutorDetailsProp={tutorDetails}
                />
              </>
            )}
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default PaymentHistoryTable;
