import React, { useEffect, useMemo, useState } from "react";
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
import { getNextWorkingDay } from "../utils/helperFunctions";
import { Transaction } from "../flows/tutorDashboard/interfaces";
import moment from "moment";

interface TransactionSummaryProps {
  amount: string;
  transactionItem?: Transaction;
  paymentDetails: Record<string, string>;
  name: string;
  role: "sender" | "receiver";
}

type PaymentDetailKey = {
  [key in
    | "utr"
    | "payment_timestamp"
    | "settlement_time"
    | "payment_mode"]: string;
};
const paymentDetailsKeys: Partial<PaymentDetailKey>[] = [
  { utr: "UTR" },
  { payment_timestamp: "Transaction date & time" },
  { settlement_time: "Settlement date & time" },
  { payment_mode: "Payment Mode" },
];
const TransactionSummary = ({
  amount,
  transactionItem,
  paymentDetails,
  role,
  name,
}: TransactionSummaryProps) => {
  const status = useMemo<"success" | "refunded" | "failed">(() => {
    return transactionItem?.status === "BENE_SETTLED" ||
      transactionItem?.status === "PG_SETTLED" ||
      transactionItem?.status === "SUCCESS"
      ? "success"
      : transactionItem?.status === "REFUNDED"
      ? "refunded"
      : "failed";
  }, [transactionItem]);
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
        <Typography
          sx={{ fontSize: 16 }}
          color={"#969696"}
          mr={1}
          alignSelf={"center"}
        >
          {role === "sender" ? "To" : "From"}
        </Typography>
        <Typography sx={{ fontSize: 16 }} mr={1} fontWeight={"bold"}>
          {name}
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
        <Amount amount={Number(amount)} fontSize={26} />
      </Stack>

      {status === "success" ? (
        <img
          src={tickMark}
          alt="tick mark"
          style={{
            marginTop: "30px",
            width: 70,
            alignSelf: "center",
          }}
        />
      ) : (
        <img
          src={exclamationMark}
          alt="exclamation mark"
          style={{
            marginTop: "30px",
            width: 70,
            alignSelf: "center",
          }}
        />
      )}
      <Box mt={3} alignSelf={"center"}>
        {status === "success" ? (
          <Typography color={"#2AC426"} component={"span"} fontWeight={"bold"}>
            Transaction Successful
          </Typography>
        ) : status === "refunded" ? (
          <Typography color={"#FFD700"} component={"span"} fontWeight={"bold"}>
            Refunded
          </Typography>
        ) : (
          <Typography color={"#FF0000"} component={"span"} fontWeight={"bold"}>
            Transaction Failed
          </Typography>
        )}
      </Box>
      {(transactionItem?.status === "BENE_SETTLED" ||
        transactionItem?.status === "SUCCESS") &&
        transactionItem?.settlement_time && (
          <Box mt={3} alignSelf={"center"}>
            <Typography
              color={"#7e7e7e"}
              component={"span"}
              fontWeight={"bold"}
            >
              {`Settled on `}
            </Typography>
            <Typography component={"span"} fontWeight={"bold"}>
              {moment(transactionItem?.settlement_time).format(
                "MMMM D, YYYY h:mm a"
              )}
            </Typography>
          </Box>
        )}

      {transactionItem?.status === "PG_SETTLED" && (
        <Box mt={3} alignSelf={"center"}>
          <Typography color={"#7e7e7e"} component={"span"} fontWeight={"bold"}>
            {`Settlement on `}
          </Typography>
          <Typography component={"span"} fontWeight={"bold"}>
            {getNextWorkingDay()}
          </Typography>
          <Typography component={"span"} color={"#7e7e7e"} fontWeight={"bold"}>
            {` at`}
          </Typography>
          <Typography component={"span"} fontWeight={"bold"}>
            {` 5:00pm`}
          </Typography>
        </Box>
      )}

      <Box width="100%" mt={5}>
        <Stack>
          {paymentDetailsKeys.map((key, index) => {
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
                <Typography textAlign={"right"}>
                  {attribute.includes("time")
                    ? new Date(
                        transactionItem?.[
                          attribute as keyof Transaction
                        ] as string
                      ).toLocaleString()
                    : transactionItem?.[attribute as keyof Transaction]}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default TransactionSummary;
