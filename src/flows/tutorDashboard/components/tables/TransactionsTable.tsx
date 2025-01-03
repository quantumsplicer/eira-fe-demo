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
import { PaymentItemDrawer } from "../../../studentDashboard/components/PaymentItemDrawer";
import { Loading } from "../../../../components/Loading";
import Amount from "../../../../components/Amount";
import PaymentLinkStatusTag from "../../../../components/PaymentLinkStatusTag";
import { trackEvent } from "../../../../utils/amplitude";

interface TransactionCellMobileProps {
  transaction: Transaction;
}

const TransactionCellMobile = ({ transaction }: TransactionCellMobileProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          border: "0.2px solid",
          borderRadius: 4,
          borderColor: "#C3C3C3",
          p: 2,
          marginBottom: 2,
          "&: hover": {
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
          },
        }}
        onClick={() => {
          trackEvent("Clicked on a Transaction", {
            txnId: transaction.id
          })
          setIsDrawerOpen(true)
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
                borderColor:
                  transaction?.status === "USER_DROPPED" ||
                  transaction?.status === "FAILED"
                    ? "#FF0000"
                    : "#2AC426",
              }}
            />
            <Stack>
              <Typography fontSize={18}>
                {
                  ((transaction?.student_first_name as string) +
                    " " +
                    transaction?.student_last_name) as string
                }
              </Typography>
              <Typography fontSize={14} color="#C3C3C3">
                +91 {transaction?.student_phone}
              </Typography>
            </Stack>
          </Stack>
          <Stack pr={2}>
            <Typography fontSize={19} fontWeight={500} textAlign="right">
              ₹ {transaction?.amount}
            </Typography>
            <Typography fontSize={14} color="#C3C3C3" textAlign="right">
              {transaction?.status === "USER_DROPPED" ||
              transaction?.status === "FAILED"
                ? "Failed"
                : transaction?.status === "BENE_SETTLED" ||
                  transaction?.status === "PG_SETTLED" ||
                  transaction?.status === "SUCCESS"
                ? "Success"
                : transaction?.status}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {isDrawerOpen && (
        <PaymentItemDrawer
          open={isDrawerOpen}
          onClose={() => {
            trackEvent("Closed Transaction Details Drawer")
            setIsDrawerOpen(false);
          }}
          transaction={transaction}
          role="tutor"
        />
      )}
    </>
  );
};

interface TransactionsTableProps {
  paymentLinkCreated: boolean;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  paymentLinkCreated,
}) => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        <Typography fontSize={16}>
          {moment(cell.getValue<string>()).format("MMMM D, YYYY h:mm a")}
        </Typography>
      ),
    }),
    columnHelper.accessor("student_phone", {
      header: "Student's Phone Number",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Typography fontSize={15}>+91 {cell.getValue<string>()}</Typography>
      ),
    }),
    columnHelper.accessor(
      (row) => row?.student_first_name + " " + row?.student_last_name,
      {
        header: "Student Name",
        enableHiding: false,
        Cell: ({ cell }) => (
          <Typography fontSize={18}>{cell.getValue<string>()}</Typography>
        ),
      }
    ),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Amount amount={cell.getValue<number>()} fontSize={18} />
      ),
    }),
    columnHelper.accessor("payment_mode", {
      header: "Payment Mode",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fffcd9",
            padding: 1,
            borderRadius: 4,
          }}
        >
          <Typography fontSize={16} fontWeight={500} textTransform="uppercase">
            {cell.getValue<string>()}
          </Typography>
        </Box>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableHiding: false,
      Cell: ({ cell }) => <StatusTag cellValue={cell.getValue<string>()} />,
    }),
    columnHelper.accessor("settlement_time", {
      header: "Settled On",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Typography>
          {cell.getValue<string>()
            ? moment(cell.getValue<string>()).format("MMMM D, YYYY h:mm a")
            : "---"}
        </Typography>
      ),
    }),
  ];
  const { data, isLoading, isSuccess, isError, error } =
    useGetTransactionsListQuery({
      limit: 1000,
    });

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

  if (isLoading) return <Loading />;
  console.log(data);
  return !isPhoneScreen ? (
    <MaterialReactTable table={table} />
  ) : data?.results && data?.results.length > 0 ? (
    <Virtuoso
      style={{ minHeight: "30vh", height: "fullheight" }}
      data={data?.results || []}
      itemContent={(_, transaction) => (
        <TransactionCellMobile transaction={transaction} />
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
              onClick={() => {
                trackEvent("Clicked on Create a Payment Link")
                setPaymentLinkFlowActive(true)
              }}
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
