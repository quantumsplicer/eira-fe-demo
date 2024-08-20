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
                <Stack justifyContent={"space-between"} direction={"row"} mb={2}>
                    <Typography width={"50%"} color={"#7e7e7e"}>
                        Transaction date & time:
                    </Typography>
                    <Stack alignItems={"flex-end"}>
                        <Typography>
                            {transactionTime}
                        </Typography>
                        <Typography>
                            {transactionDate}
                        </Typography>
                    </Stack>
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
            <CheckCircleOutlineIcon
                sx={{ color: "green", fontSize: 90, mt: 5 }}
            />
        </Stack>
    )
}

export default PaymentSuccessInfo;