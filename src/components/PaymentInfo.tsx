import React, { useEffect, useMemo } from "react";
import { Stack, Typography, Box } from "@mui/material";
import Amount from "./Amount";
import tickMark from "../assets/images/png/tick-mark.png";
import exclamationMark from "../assets/images/svg/ExclamationMark.svg";
import crossMark from "../assets/images/png/cross-mark.png";
import { useSelector } from "react-redux";
import { RootState } from "../stores/configuration";
import {
  useGetPaymentStatusQuery,
  useLazyGetPaymentStatusQuery,
} from "../APIs/definitions/paymentLinks";
import { getNextWorkingDay } from "../utils/helperFunctions";
import { Transaction } from "../flows/tutorDashboard/interfaces";

interface PaymentInfoProps {
  amount: string;
  name: string;
  transactionItem?: Transaction;
  paymentDetails: Record<string, string>;
  type: string;
}

const formattedInfo = {
  "Transaction ID": ["Transaction ID"],
  "Account Number": ["Account Number"],
  "Account Holder": ["Payee Name", "Payee Phone"],
  "Transaction date & time": ["Transaction Date", "Transaction Time"],
  "Session date & time": ["Session Date", "Session Time"],
};

const PaymentInfo = ({
  amount,
  name,
  transactionItem,
  paymentDetails,
  type,
}: PaymentInfoProps) => {
  const orderId = localStorage.getItem("order_id");
  const { data: paymentStatus, isLoading: paymentStatusIsLoading } =
    useGetPaymentStatusQuery(orderId as string, {
      skip: !orderId,
    });

  const formattedPaymentDetails = useMemo(() => {
    const paymentDetailsKeys = Object.keys(paymentDetails);
    const newValue = Object.entries(formattedInfo).reduce(
      (acc: Record<string, string[]>, [key, details]) => {
        // Check if all elements in details exist in paymentDetailsKeys
        if (
          details.every(
            (detail) =>
              paymentDetailsKeys.includes(detail) &&
              paymentDetails[detail] != null
          )
        ) {
          acc[key] = details.map((detail) => paymentDetails[detail]);
        }
        return acc;
      },
      {}
    );
    return newValue;
  }, [paymentDetails]);

  useEffect(() => {
    console.log("From PaymentInfo");
    console.log(transactionItem);
    console.log(paymentDetails);
  }, [transactionItem, paymentDetails]);

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
        <Typography
          variant="h5"
          sx={{ fontSize: 20 }}
          color={"#969696"}
          mr={1}
          alignSelf={"center"}
        >
          {type === "review"
            ? "Paying"
            : paymentStatus?.order?.status === "PAID" 
              ? "Sent"
              : "Failed to pay"}
        </Typography>
        <Amount amount={Number(amount)} fontSize={20} />
      </Stack>
      <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
        <Typography variant="h5" sx={{ fontSize: 20 }} color={"#969696"} mr={1}>
          to
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: 20 }}
          mr={1}
          fontWeight={"bold"}
        >
          {name}
        </Typography>
      </Stack>

      {type === "success" && !paymentStatusIsLoading ? (
        paymentStatus?.order?.status == "PAID" ||
        transactionItem?.status == "SUCCESS" ? (
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
            src={crossMark}
            style={{
              marginTop: "30px",
              width: 70,
              alignSelf: "center",
            }}
          />
        )
      ) : null}

      {transactionItem?.status === "SUCCESS" && (
        <Box mt={3} alignSelf={"center"}>
          <Typography color={"#7e7e7e"} component={"span"} fontWeight={"bold"}>
            {`Settlement on `}
          </Typography>
          <Typography component={"span"} fontWeight={"bold"}>
            {getNextWorkingDay()}{" "}
            {/* Change this to incorporate the settlement date sent from the transaction object */}
          </Typography>
          <Typography component={"span"} color={"#7e7e7e"} fontWeight={"bold"}>
            {` at`}
          </Typography>
          <Typography component={"span"} fontWeight={"bold"}>
            {` 5:00pm`}
          </Typography>
        </Box>
      )}

      {type === "success" && !paymentStatusIsLoading && !transactionItem ? (
        paymentStatus?.order?.status === "PAID" && (
          <Box mt={3} alignSelf={"center"}>
            <Typography
              color={"#7e7e7e"}
              component={"span"}
              fontWeight={"bold"}
            >
              {`Settlement on `}
            </Typography>
            <Typography component={"span"} fontWeight={"bold"}>
              {getNextWorkingDay()}
            </Typography>
            <Typography
              component={"span"}
              color={"#7e7e7e"}
              fontWeight={"bold"}
            >
              {` at`}
            </Typography>
            <Typography component={"span"} fontWeight={"bold"}>
              {` 5:00pm`}
            </Typography>
          </Box>
        )
      ) : null}

      {type === "review" && (
        <Typography
          variant="subtitle1"
          sx={{ fontSize: 14, mt: 3, textAlign: "center", alignSelf: "center" }}
        >
          Confirm payment details and make payment
        </Typography>
      )}

      <Box width="100%" minWidth="320px" maxWidth="400px" mt={5}>
        <Stack>
          {Object.keys(formattedPaymentDetails).map((key, index) => {
            return (
              <Stack
                justifyContent={"space-between"}
                direction={"row"}
                mb={2}
                key={index}
              >
                <Typography width={"50%"} color={"#7e7e7e"}>
                  {key}:
                </Typography>
                <Stack alignItems={"flex-end"}>
                  {formattedPaymentDetails[key].map((value, index) => {
                    return <Typography key={index}>{value}</Typography>;
                  })}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default PaymentInfo;
