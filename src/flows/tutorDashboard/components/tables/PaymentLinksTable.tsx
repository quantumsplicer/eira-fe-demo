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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PaymentLinkStatusTag from "../../../../components/PaymentLinkStatusTag";

interface PaymentLinkCellMobileProps {
  paymentLinkDetails: PaymentLinkDetails;
  onClick: () => void;
}

const PaymentLinkCellMobile = ({
  paymentLinkDetails,
  onClick,
}: PaymentLinkCellMobileProps) => {
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
  const copyToClipboard = (paymentLink: string) => {
    navigator.clipboard
      .writeText(paymentLink)
      .then(() => {
        alert("Payment Link copied");
      })
      .catch((err: Error) => {
        console.error("Failed to copy payment link: ", err);
      });
  };
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
    columnHelper.accessor("receiver_phone", {
      header: "Student's Phone Number",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Typography fontSize={15}>+91 {cell.getValue<string>()}</Typography>
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Amount amount={cell.getValue<number>()} fontSize={15} />
      ),
    }),

    columnHelper.accessor("expiry_timestamp", {
      header: "Expires On",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Typography>
          {moment(cell.getValue<string>()).format("MMMM D, YYYY h:mm a")}
        </Typography>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableHiding: false,
      Cell: ({ cell }) => (
        <PaymentLinkStatusTag cellValue={cell.getValue<string>()} />
      ),
    }),
    columnHelper.accessor("url", {
      header: "Payment Link",
      enableHiding: false,
      Cell: ({ cell }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => copyToClipboard(cell.getValue<string>())}
          sx={{
            textTransform: "none",
            borderRadius: 3,
            fontSize: 12,
          }}
        >
          Copy Link
        </Button>
      ),
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
    enableRowActions: false,
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
        fontSize: 15,
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

  const handleLinkCopy = (link: string) => {
    navigator.clipboard.writeText(link);
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
                +91{activeDrawerPaymentLinkDetails?.receiver_phone}
              </Typography>
            </Stack>
            {activeDrawerPaymentLinkDetails?.status === "ACTIVE" ? (
              <img
                alt="tick"
                src={tickMark}
                style={{
                  marginTop: "30px",
                  width: 70,
                  alignSelf: "center",
                }}
              />
            ) : (
              <img
                alt="exclamation"
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
                  {moment().isAfter(
                    activeDrawerPaymentLinkDetails.expiry_timestamp
                  )
                    ? `Expired on `
                    : `Expires on `}
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
                {activeDrawerPaymentLinkDetails?.url && (
                  <Stack
                    alignSelf={"center"}
                    direction={"row"}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleLinkCopy(activeDrawerPaymentLinkDetails?.url)
                    }
                  >
                    <Typography
                      mr={1}
                      sx={{
                        textDecoration: "underline",
                      }}
                    >
                      Copy payment link
                    </Typography>
                    <ContentCopyIcon />
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
