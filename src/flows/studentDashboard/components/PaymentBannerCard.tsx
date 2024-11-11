import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import PaymentLinkBannerArt from "../../../assets/images/svg/PaymentLinkBannerArt.svg";
import { TutorDetails } from "../interfaces";
import PaymentFlow from "./PaymentFlow";
import { useGetTransactionsListQuery } from "../../../APIs/definitions/transactionsList";
import { Transaction } from "../../tutorDashboard/interfaces";
import { useGetUserDetailsByPhoneQuery } from "../../../APIs/definitions/user";

interface AvatarWithDetailsProps {
  name: string;
  phoneNumber: string;
}

const AvatarWithDetails: React.FC<AvatarWithDetailsProps> = ({
  name,
  phoneNumber,
}) => {
  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    firstName: "",
    lastName: "",
    panNumber: "",
    phoneNumber: "",
  });
  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);
  const { data: tutorData } = useGetUserDetailsByPhoneQuery(phoneNumber);

  const handleClick = () => {
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
    <Stack spacing={1} alignItems="center">
      <Avatar
        alt={name}
        sx={{
          width: "80px",
          height: "80px",
          bgcolor: "primary.main",
          fontSize: "40px",
        }}
        onClick={handleClick}
      >
        <Typography fontSize={36}>
          {name?.[0].replace(" ", "") ? name?.[0] : "U"}
        </Typography>
      </Avatar>
      <Stack alignItems="center">
        <Typography sx={{ fontSize: 11, fontWeight: 500 }}>{name}</Typography>
        <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
          {phoneNumber}
        </Typography>
      </Stack>
      {isPaymentFlowActive && (
        <PaymentFlow
          open={isPaymentFlowActive}
          onClose={handleClosePaymentFlow}
          tutorDetailsProp={tutorDetails}
        />
      )}
    </Stack>
  );
};

const PaymentBannerCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);
  const { data: transactionDetails } = useGetTransactionsListQuery({
    limit: 1000,
  });
  const [recentPayments, setRecentPayments] = useState<TutorDetails[]>([]);

  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    firstName: "",
    lastName: "",
    panNumber: "",
    phoneNumber: "",
  });
  const handleClick = () => {
    setIsPaymentFlowActive(true);
  };

  const handleClosePaymentFlow = () => {
    setIsPaymentFlowActive(false);
  };

  useEffect(() => {
    if (transactionDetails?.results) {
      // Create a Set to track unique phone numbers
      const uniqueTransactions = new Set<string>();

      // Filter distinct transactions based on `tutor_phone`
      const distinctPayments = transactionDetails.results.filter(
        (transaction: Transaction) => {
          if (!uniqueTransactions.has(transaction.tutor_phone as string)) {
            uniqueTransactions.add(transaction.tutor_phone as string);
            return true; // Include this transaction
          }
          return false; // Skip if already included
        }
      );

      // Map the distinct transactions to the desired format
      const newPayments = distinctPayments.map((transaction: Transaction) => ({
        firstName: (transaction?.tutor_first_name as string) ?? "",
        lastName: (transaction?.tutor_last_name as string) ?? "",
        phoneNumber: transaction.tutor_phone as string,
        panNumber: "",
        amount: transaction.amount,
      }));

      // Update `recentPayments` state with distinct transactions
      setRecentPayments(newPayments);
    }
  }, [transactionDetails]);

  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              p: 6,
              borderRadius: 2,
              backgroundColor: "white",
              boxShadow: 6,
              width: "18vw",
              height: "100%",
            }
          : {
              p: 2,
              backgroundColor: "white",
              width: "100vw",
              height: "98vw",
              alignSelf: "center",
            }
      }
    >
      <Stack
        direction="row"
        spacing={!isPhoneScreen ? 0 : 4}
        sx={
          !isPhoneScreen
            ? {
                justifyContent: "space-around",
              }
            : {
                justifyContent: "space-between",
                height: "100%",
              }
        }
        width="fullwidth"
      >
        <Stack
          direction={!isPhoneScreen ? "row" : "column"}
          spacing={!isPhoneScreen ? 0 : 4}
          sx={
            !isPhoneScreen
              ? {
                  flexDirection: "row",
                  alignItems: "center",
                }
              : {
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "space-evenly",
                  paddingLeft: 2,
                  paddingRight: 2,
                }
          }
        >
          <Stack
            spacing={2}
            alignItems="center"
            direction={!isPhoneScreen ? "column" : "row-reverse"}
            sx={
              !isPhoneScreen
                ? {
                    justifyContent: "space-between",
                  }
                : {
                    justifyContent: "space-evenly",
                    height: "100%",
                    paddingTop: 4,
                  }
            }
          >
            {!isPhoneScreen && (
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  backgroundColor: "#507FFD",
                  borderRadius: 3,
                  fontSize: { md: "0.6rem", lg: "1rem" },
                  fontWeight: 600,
                  height: 60,
                  paddingLeft: 2,
                  paddingRight: 2,
                  textTransform: "none",
                }}
              >
                Make a new Payment
              </Button>
            )}
            <Stack
              direction="row"
              spacing={!isPhoneScreen ? 1 : 0}
              sx={!isPhoneScreen ? {} : { width: "100%" }}
            >
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: "1.2rem", fontWeight: 500 }
                    : { fontSize: "1.4rem", fontWeight: 500, width: "70%" }
                }
              >
                Pay Tution Fees through Credit Card <strong> @ just 1%</strong>
              </Typography>
            </Stack>
          </Stack>
          {isPhoneScreen ? (
            <Stack spacing={4} width="100%">
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                Recent Payments
              </Typography>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="flex-start"
                sx={{ width: "100%" }}
              >
                {transactionDetails?.results?.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "120px",
                      width: "100%",
                    }}
                  >
                    <Typography fontStyle={"italic"} color={"grey"}>
                      No recent payments
                    </Typography>
                  </Box>
                ) : (
                  recentPayments
                    ?.slice(0, 3)
                    .map((transaction, index) => (
                      <AvatarWithDetails
                        key={index}
                        name={`${transaction.firstName} ${transaction.lastName}`}
                        phoneNumber={transaction.phoneNumber ?? ""}
                      />
                    ))
                )}
              </Stack>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
      {isPaymentFlowActive && (
        <PaymentFlow
          open={isPaymentFlowActive}
          onClose={handleClosePaymentFlow}
          tutorDetailsProp={tutorDetails}
        />
      )}
    </Box>
  );
};
export default PaymentBannerCard;
