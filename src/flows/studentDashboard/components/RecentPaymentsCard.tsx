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
interface AvatarWithDetailsProps {
  name: string;
  phoneNumber: string;
  amount: number;
  onClick: () => void;
}

const AvatarWithDetails: React.FC<AvatarWithDetailsProps> = ({
  name,
  phoneNumber,
  amount,
  onClick,
}) => {
  return (
    <Stack
      spacing={1}
      width="100%"
      alignItems="center"
      direction="row"
      justifyContent="space-between"
    >
      <Avatar
        alt={name}
        sx={{
          width: "35px",
          height: "35px",
          bgcolor: "#507FFD",
          fontSize: "20px",
        }}
        onClick={onClick}
      >
        <Typography fontSize={36}>
          {name?.[0].replace(" ", "") ? name?.[0] : "U"}
        </Typography>
      </Avatar>
      <Stack
        alignItems="center"
        direction="row"
        width="100%"
        justifyContent="space-around"
      >
        <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
          {phoneNumber}
        </Typography>
        <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
          {amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </Typography>
      </Stack>
    </Stack>
  );
};

const RecentPaymentsCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);

  const { data: transactionDetails } = useGetTransactionsListQuery({
    limit: 1000,
  });

  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    firstName: "",
    lastName: "",
    panNumber: "",
    phoneNumber: "",
  });
  const [recentPayments, setRecentPayments] = useState<TutorDetails[]>([]);

  const handleClosePaymentFlow = () => {
    setIsPaymentFlowActive(false);
  };

  const handleTutorDetails = (details: TutorDetails) => {
    setTutorDetails(details);
    setIsPaymentFlowActive(true);
  };

  const handleOpenPaymentFlow = () => {
    setTutorDetails({
      firstName: "",
      lastName: "",
      panNumber: "",
      phoneNumber: "",
    });
    setIsPaymentFlowActive(true);
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
        firstName: transaction?.tutor_first_name as string ?? "",
        lastName: transaction?.tutor_last_name as string ?? "",
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
          <Stack
            spacing={1}
            width="100%"
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
                bgcolor: "white",
                fontSize: "20px",
              }}
            ></Avatar>
            <Stack
              alignItems="center"
              direction="row"
              width="100%"
              justifyContent="space-around"
            >
              <Typography
                sx={{ fontSize: "1.1rem", fontWeight: 600, color: "gray" }}
              >
                Name
              </Typography>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: 600, color: "gray" }}
              >
                Phone Number
              </Typography>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: 600, color: "gray" }}
              >
                Amount
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={2} width="100%">
            {recentPayments.slice(0, 3).map((avatar, index) => (
              <AvatarWithDetails
                key={index}
                name={`${avatar.firstName} ${avatar.lastName}`}
                phoneNumber={avatar.phoneNumber}
                amount={2000}
                onClick={() => {
                  handleTutorDetails(avatar);
                }}
              />
            ))}
          </Stack>
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
const avatarsWithDetails: TutorDetails[] = [
  {
    firstName: "John",
    lastName: "Dorito",
    panNumber: "1234567890",
    phoneNumber: "9997945005",
  },
  {
    firstName: "Sugarcane",
    lastName: "Smith",
    panNumber: "1234567890",
    phoneNumber: "9411819909",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    panNumber: "1234567890",
    phoneNumber: "9412061914",
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    panNumber: "1234567890",
    phoneNumber: "9997945005",
  },
  {
    firstName: "Eva",
    lastName: "Brown",
    panNumber: "1234567890",
    phoneNumber: "9997945005",
  },
];
export default RecentPaymentsCard;
