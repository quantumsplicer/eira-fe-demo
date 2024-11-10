import React, { useEffect, useMemo, useState } from "react";
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
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "../StatusTag";
import { Virtuoso } from "react-virtuoso";
import { Transaction } from "../../interfaces";
import { useGetTransactionsListQuery } from "../../../../APIs/definitions/transactionsList";
import SendPaymentLinkFlow from "../flows/SendPaymentLinkFlow";
import { useGetUserDetailsQuery } from "../../../../APIs/definitions/user";
import { UserDetails } from "../../../../APIs/definitions/user";
import moment from "moment";

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
interface TransactionsTableProps {
  paymentLinkCreated: boolean;
}
const TransactionsTable: React.FC<TransactionsTableProps> = ({
  paymentLinkCreated,
}) => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";

  const columnHelper = createMRTColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor("created", {
      header: "Created On",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Typography>
          {moment(cell.getValue<string>()).format("MMMM D, YYYY h:mm a")}
        </Typography>
      ),
    }),
    columnHelper.accessor("student_name", {
      header: "Student Name",
      enableHiding: false,
    }),
    columnHelper.accessor("student_phone", {
      header: "Student's Phone Number",
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
    columnHelper.accessor("settlement_timestamp", {
      header: "Settled On",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Typography>
          {moment(cell.getValue<string>()).format("MMMM D, YYYY h:mm a")}
        </Typography>
      ),
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
        fontSize: 15,
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
  const [paymentLinkFlowActive, setPaymentLinkFlowActive] = useState(false);
  return !isPhoneScreen ? (
    <MaterialReactTable table={table} />
  ) : data?.results && data?.results.length > 0 ? (
    <Virtuoso
      style={{ minHeight: "30vh", height: "fullheight" }}
      data={data?.results || []}
      itemContent={(_, user) => (
        <TransactionCellMobile
          name={user.student_name as string}
          phoneNumber={user.student_phone as string}
          status={user.settlement_status}
          amount={user.amount}
        />
      )}
    />
  ) : (
    <>
      {" "}
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
          {paymentLinkCreated ? (
            <Typography fontSize="1.2rem" color="#b8bbbf" textAlign="center">
              Transactions made through your payment link will appear here
            </Typography>
          ) : (
            <Typography variant="h6" color="#b8bbbf">
              No transactions found
            </Typography>
          )}
          <Stack direction="column" spacing={2}>
            <Typography
              fontSize={"0.7rem"}
              color="#b8bbbf"
              sx={{ fontStyle: "italic" }}
              textAlign="center"
            >
              {paymentLinkCreated
                ? "Create a new payment link"
                : "Create a payment link now to start receiving payments!"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setPaymentLinkFlowActive(true)}
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
              Create a Payment Link
            </Button>
          </Stack>
        </Stack>
      </Box>
      <SendPaymentLinkFlow
        isActive={paymentLinkFlowActive}
        onClose={() => setPaymentLinkFlowActive(false)}
      />
    </>
  );
};

export default TransactionsTable;
