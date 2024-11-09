import React, { useMemo, useState } from "react";
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
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "../StatusTag";
import { Virtuoso } from "react-virtuoso";
import { useGetPaymentLinksQuery } from "../../../../APIs/definitions/paymentLinks";
import { PaymentLinkDetails } from "../../interfaces";
import SendPaymentLinkFlow from "../flows/SendPaymentLinkFlow";
import PaymentInfo from "../../../../components/PaymentInfo";
import CloseIcon from "@mui/icons-material/Close";
import { useGetUserDetailsByPhoneQuery } from "../../../../APIs/definitions/user";
import Amount from "../../../../components/Amount";
import tickMark from "../../../../assets/images/png/tick-mark.png";
import exclamationMark from "../../../../assets/images/svg/ExclamationMark.svg";
import moment from "moment";

interface PaymentLinkCellMobileProps {
  paymentLinkDetails: PaymentLinkDetails;
  onClick: () => void;
}

const formattedInfo = {
  "Transaction ID": ["Transaction ID"],
  "Account Number": ["Account Number"],
  "Account Holder": ["Payee Name", "Payee Phone"],
  "Transaction date & time": ["Transaction Date", "Transaction Time"],
  "Session date & time": ["Session Date", "Session Time"],
};
const PaymentLinkCellMobile = ({
  paymentLinkDetails,
  onClick,
}: PaymentLinkCellMobileProps) => {
  const { data: userDetails } = useGetUserDetailsByPhoneQuery(
    paymentLinkDetails.receiver_phone
  );

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
      onClick={onClick}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack direction="row" spacing={2}>
          <Stack>
            <Typography
              fontSize={18}
              textAlign="left"
              sx={{
                fontStyle:
                  userDetails?.[0]?.first_name === "" &&
                  userDetails?.[0]?.last_name === ""
                    ? "italic"
                    : "normal",
              }}
            >
              {userDetails?.[0]?.first_name === "" &&
              userDetails?.[0]?.last_name === ""
                ? "null"
                : `${userDetails?.[0]?.first_name} ${userDetails?.[0]?.last_name}`}
            </Typography>
            <Typography fontSize={14} color="#C3C3C3" textAlign="left">
              {paymentLinkDetails.receiver_phone}
            </Typography>
          </Stack>
        </Stack>
        <Stack pr={2}>
          <Typography fontSize={19} fontWeight={500} textAlign="right">
            ₹ {paymentLinkDetails.amount}
          </Typography>
          <Typography fontSize={14} color="#C3C3C3" textAlign="right">
            {paymentLinkDetails.status}
          </Typography>
        </Stack>
      </Stack>
    </Button>
  );
};
interface PaymentLinksTableProps {
  data: PaymentLinkDetails[] | undefined;
}
const PaymentLinksTable: React.FC<PaymentLinksTableProps> = ({ data }) => {
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerPaymentLinkDetails, setActiveDrawerPaymentLinkDetails] =
    useState<PaymentLinkDetails | null>(null);
  const [paymentLinkFlowActive, setPaymentLinkFlowActive] = useState(false);
  const handleOnClick = (paymentLinkDetails: PaymentLinkDetails) => {
    console.log(paymentLinkDetails);
    return () => {
      setIsDrawerOpen(true);
      setActiveDrawerPaymentLinkDetails(paymentLinkDetails);
    };
  };
  return !isPhoneScreen ? (
    <MaterialReactTable table={table} />
  ) : data && data.length > 0 ? (
    <>
      <Virtuoso
        style={{ minHeight: "30vh", height: "fullheight" }}
        data={data}
        itemContent={(_, user) => (
          <PaymentLinkCellMobile
            paymentLinkDetails={user}
            onClick={handleOnClick(user)}
          />
        )}
      />
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            padding: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: "100%",
            boxSizing: "border-box",
          },
        }}
        anchor="bottom"
      >
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box height="100%" width="100%">
          <Stack height="100%" width="100%">
            <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
              <Typography
                variant="h5"
                sx={{ fontSize: 20 }}
                color={"#969696"}
                mr={1}
                alignSelf={"center"}
              >
                Payment link for
              </Typography>
              <Amount
                amount={Number(activeDrawerPaymentLinkDetails?.amount)}
                fontSize={20}
              />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
              <Typography
                variant="h5"
                sx={{ fontSize: 20 }}
                color={"#969696"}
                mr={1}
              >
                sent to
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontSize: 20 }}
                mr={1}
                fontWeight={"bold"}
              >
                {activeDrawerPaymentLinkDetails?.receiver_phone}
              </Typography>
            </Stack>
            {activeDrawerPaymentLinkDetails?.status === "ACTIVE" ? (
              <img
                src={tickMark}
                style={{
                  marginTop: "30px",
                  width: 70,
                  alignSelf: "center",
                }}
              />
            ) : (
              <img
                src={exclamationMark}
                style={{
                  marginTop: "30px",
                  width: 70,
                  alignSelf: "center",
                }}
              />
            )}
            {activeDrawerPaymentLinkDetails?.status === "ACTIVE" ? (
              <Box mt={3} alignSelf={"center"}>
                <Typography
                  color={"#7e7e7e"}
                  component={"span"}
                  fontWeight={"bold"}
                >
                  {`Expires on `}
                </Typography>
                <Typography component={"span"} fontWeight={"bold"}>
                  {moment(
                    activeDrawerPaymentLinkDetails.expiry_timestamp
                  ).format("MMMM D, YYYY")}
                </Typography>
                <Typography
                  component={"span"}
                  color={"#7e7e7e"}
                  fontWeight={"bold"}
                >
                  {` at `}
                </Typography>
                <Typography component={"span"} fontWeight={"bold"}>
                  {moment(
                    activeDrawerPaymentLinkDetails.expiry_timestamp
                  ).format("h:mm a")}
                </Typography>
              </Box>
            ) : (
              <Box mt={3} alignSelf={"center"}>
                <Typography color={"#7e7e7e"}>Payment link expired</Typography>
              </Box>
            )}

            <Box width="100%" minWidth="320px" maxWidth="400px" mt={5}>
              <Stack>
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  mb={2}
                >
                  <Typography width={"50%"} color={"#7e7e7e"}>
                    Date of Creation
                  </Typography>
                  <Stack alignItems={"flex-end"}>
                    <Typography>
                      {moment(activeDrawerPaymentLinkDetails?.created).format(
                        "MMMM D, YYYY h:mm a"
                      )}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  mb={2}
                >
                  <Typography width={"50%"} color={"#7e7e7e"}>
                    Expires On
                  </Typography>
                  <Stack alignItems={"flex-end"}>
                    <Typography>
                      {moment(
                        activeDrawerPaymentLinkDetails?.expiry_timestamp
                      ).format("MMMM D, YYYY h:mm a")}
                    </Typography>
                  </Stack>
                </Stack>
                {activeDrawerPaymentLinkDetails?.payer && (
                  <Stack
                    justifyContent={"space-between"}
                    direction={"row"}
                    mb={2}
                  >
                    <Typography width={"50%"} color={"#7e7e7e"}>
                      Payer
                    </Typography>
                    <Stack alignItems={"flex-end"}>
                      <Typography>
                        {activeDrawerPaymentLinkDetails?.payer}
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </>
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
          <Typography fontSize={"1.1rem"} color="#b8bbbf" textAlign="center">
            You've not created any payment links yet!
          </Typography>
          <Stack direction="column" spacing={2}>
            <Typography
              fontSize={"0.7rem"}
              color="#b8bbbf"
              sx={{ fontStyle: "italic" }}
              textAlign="center"
            >
              Create a payment link now to start receiving payments!
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

export default PaymentLinksTable;
