import React, { useMemo } from "react";
import { Stack, Typography, Box } from "@mui/material";
import Amount from "./Amount";
import tickMark from "../assets/images/png/tick-mark.png";
import exclamationMark from "../assets/images/svg/ExclamationMark.svg";
import { useSelector } from "react-redux";
import { RootState } from "../stores/configuration";
import {
  useGetPaymentStatusQuery,
  useLazyGetPaymentStatusQuery,
} from "../APIs/definitions/paymentLinks";

interface PaymentInfoProps {
  amount: string;
  name: string;
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
  paymentDetails,
  type,
}: PaymentInfoProps) => {
  const orderId = localStorage.getItem("order_id");
  const { data: paymentStatus, isLoading: paymentStatusIsLoading } =
    useGetPaymentStatusQuery(orderId as string);

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

  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography variant="h5" sx={{ fontSize: 20 }} color={"#969696"} mr={1}>
          {type === "review" || paymentStatus?.status !== "PAID" ? "Paying" : "Sent"}
        </Typography>
        <Amount amount={Number(amount)} fontSize={20} />
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
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
      {type === "success" ? (
        paymentStatus?.status === "PAID" ? (
          <img
            src={tickMark}
            style={{
              marginTop: "30px",
              width: 90,
            }}
          />
        ) : (
          <img
            src={exclamationMark}
            style={{
              marginTop: "30px",
              width: 90,
            }}
          />
        )
      ) : null}
      {type === "success" ? (
        paymentStatus?.status === "PAID" ? (
          <Box mt={3}>
            <Typography
              color={"#7e7e7e"}
              component={"span"}
              fontWeight={"bold"}
            >
              Settlement on
            </Typography>
            <Typography component={"span"} fontWeight={"bold"}>
              {` 7th October`}
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
        ) : (
          <Box mt={3}>
            <Typography color={"#7e7e7e"}>Payment under process</Typography>
          </Box>
        )
      ) : null}
      {type === "review" && (
        <Typography
          variant="subtitle1"
          sx={{ fontSize: 14, mt: 3, textAlign: "center" }}
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
