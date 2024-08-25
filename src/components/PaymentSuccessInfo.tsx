import React from "react";
import PaymentReviewInfo from "./PaymentReviewInfo";
import {
    Stack,
    Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface PaymentSuccessInfoProps {
    transactionId: string;
    transactionDate: string;
    transactionTime: string;
    accountNumber: string;
    name: string;
    phoneNumber: string;
    sessionStartTime: string;
    sessionEndTime: string;
    sessionDate: string;
}

const PaymentSuccessInfo = ({ transactionId, transactionDate, transactionTime, accountNumber, name, phoneNumber, sessionStartTime, sessionEndTime, sessionDate }: PaymentSuccessInfoProps) => {
    return (
        <Stack alignItems={"center"}>
            <Stack>
                <Stack justifyContent={"space-between"} direction={"row"} mb={2}>
                    <Typography width={"50%"} color={"#7e7e7e"}>
                        Transaction ID:
                    </Typography>
                    <Typography>
                        {transactionId}
                    </Typography>
                </Stack>
                <PaymentReviewInfo
                    accountNumber={accountNumber}
                    name={name}
                    phoneNumber={phoneNumber}
                    sessionStartTime={sessionStartTime}
                    sessionEndTime={sessionEndTime}
                    sessionDate={sessionDate}
                />
            </Stack>
        </Stack>
    )
}

export default PaymentSuccessInfo;