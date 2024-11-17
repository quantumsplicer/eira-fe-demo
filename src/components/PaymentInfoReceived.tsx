import React, { useMemo } from "react";
import { Stack, Typography, Box } from "@mui/material";
import Amount from "./Amount";
import tickMark from "../assets/images/png/tick-mark.png";
import exclamationMark from "../assets/images/svg/ExclamationMark.svg";

import { useGetPaymentStatusQuery } from "../APIs/definitions/paymentLinks";
import { Transaction } from "../flows/tutorDashboard/interfaces";

type PaymentDetailKey = {
  [key in
    | "id"
    | "payment_timestamp"
    | "settlement_timestamp"
    | "payment_mode"]: string;
};
interface PaymentInfoReceivedProps {
  amount: string;
  name: string;
  transactionItem?: Transaction;
  type: string;
}

const paymentDetailsKeys: Partial<PaymentDetailKey>[] = [
  { id: "Transaction ID" },
  { payment_timestamp: "Transaction date & time" },
  { settlement_timestamp: "Settlement date & time" },
  { payment_mode: "Payment Mode" },
];
const PaymentInfoReceived = ({
  amount,
  name,
  transactionItem,
  type,
}: PaymentInfoReceivedProps) => {
  const orderId = localStorage.getItem("order_id");
  const { data: paymentStatus, isLoading: paymentStatusIsLoading } =
    useGetPaymentStatusQuery(orderId as string, {
      skip: !orderId,
    });

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        alignSelf={"center"}
        spacing={1}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: 18 }}
          color={"#969696"}
          mr={1}
          alignSelf={"center"}
        >
          {transactionItem?.status === "SUCCESS"
            ? "You received a payment of"
            : "Sent"}
        </Typography>
        <Amount amount={Number(amount)} fontSize={22} />
      </Stack>
      <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
        <Typography variant="h5" sx={{ fontSize: 20 }} color={"#969696"} mr={1}>
          By
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
            src={exclamationMark}
            style={{
              marginTop: "30px",
              width: 70,
              alignSelf: "center",
            }}
          />
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
          {paymentDetailsKeys.map((key, index) => {
            console.log("printing keys");
            const attribute = Object.keys(key)[0];
            return (
              <Stack
                justifyContent={"space-between"}
                direction={"row"}
                mb={2}
                key={index}
              >
                <Typography width={"50%"} color={"#7e7e7e"}>
                  {key[attribute as keyof PaymentDetailKey]}:
                </Typography>
                <Stack alignItems={"flex-end"}>
                  {attribute.includes("timestamp")
                    ? new Date(
                        transactionItem?.[
                          attribute as keyof Transaction
                        ] as string
                      ).toLocaleString()
                    : transactionItem?.[attribute as keyof Transaction]}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default PaymentInfoReceived;
