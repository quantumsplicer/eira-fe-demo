import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Divider,
  Paper,
  TableRow,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  useMediaQuery,
  TableBody,
} from "@mui/material";
import Button from "@mui/material/Button";
import PaymentLinkBannerArt from "../../../assets/images/svg/PaymentLinkBannerArt.svg";
import { TutorDetails } from "../interfaces";
import PaymentFlow from "./PaymentFlow";
import { useGetTransactionsListQuery } from "../../../APIs/definitions/transactionsList";
import { Transaction } from "../../tutorDashboard/interfaces";
import { useGetUserDetailsByPhoneQuery } from "../../../APIs/definitions/user";

interface TransactionAndTutorDetails extends Transaction {
  tutorDetails: TutorDetails;
}
const RecentPaymentRow: React.FC<Transaction> = (rowData) => {
  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);

  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    firstName: "",
    lastName: "",
    panNumber: "",
    phoneNumber: "",
  });
  const { data: tutorData } = useGetUserDetailsByPhoneQuery(
    rowData.tutor_phone ?? ""
  );
  const handleOnClick = () => {
    setTutorDetails({
      firstName: tutorData?.[0]?.first_name ?? "",
      lastName: tutorData?.[0]?.last_name ?? "",
      panNumber: tutorData?.[0]?.pan ?? "",
      phoneNumber: tutorData?.[0]?.phone ?? "",
    });
    setIsPaymentFlowActive(true);
  };
  const handleClosePaymentFlow = () => {
    setIsPaymentFlowActive(false);
  };
  return (
    <>
      <TableRow
        key={rowData.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>
          <Avatar
            sx={{
              width: "35px",
              height: "35px",
              bgcolor: "#507FFD",
              fontSize: "10px",
            }}
          >
            <Typography fontSize={20}>
              {tutorData?.[0]?.first_name?.[0]}
            </Typography>
          </Avatar>
        </TableCell>
        <TableCell align="right">
          {tutorData?.[0]?.first_name} {tutorData?.[0]?.last_name}
        </TableCell>
        <TableCell align="right">{rowData.tutor_phone}</TableCell>
        <TableCell align="right">{rowData.amount}</TableCell>
        <TableCell align="right">
          <Button variant="contained" color="primary" onClick={handleOnClick}>
            Pay Again
          </Button>
        </TableCell>
      </TableRow>
      {isPaymentFlowActive && (
        <PaymentFlow
          open={isPaymentFlowActive}
          onClose={handleClosePaymentFlow}
          tutorDetailsProp={tutorDetails}
        />
      )}
    </>
  );
};
const RecentPaymentsCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const { data: transactionDetails } = useGetTransactionsListQuery();

  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              p: 4,
              borderRadius: 2,
              backgroundColor: "white",
              background: "linear-gradient(to right, #FFFFFF, #fbfeff)",
              boxShadow: 6,
              width: "50vw",
            }
          : {
              display: "none",
            }
      }
    >
      <Stack spacing={4}>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontSize: "1.6rem", fontWeight: 600 }}>
            Recent Payments
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionDetails?.results.slice(0, 3).map((row) => (
                  <RecentPaymentRow key={row.id} {...row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RecentPaymentsCard;
