import React from "react";
import {
    Stack,
    Typography,
} from "@mui/material";

interface PaymentReviewInfoProps {
    accountNumber: string;
    name: string;
    phoneNumber: string;
    sessionStartTime: string;
    sessionEndTime: string;
    sessionDate: string;
}

const PaymentReviewInfo = ({ accountNumber, name, phoneNumber, sessionStartTime, sessionEndTime, sessionDate }: PaymentReviewInfoProps) => {
    return (
        <Stack>
            <Stack justifyContent={"space-between"} direction={"row"} mb={2}>
                <Typography width={"50%"} color={"#7e7e7e"}>
                    Account Number:
                </Typography>
                <Typography>
                    {accountNumber}
                </Typography>
            </Stack>
            <Stack justifyContent={"space-between"} direction={"row"} mb={2}>
                <Typography width={"50%"} color={"#7e7e7e"}>
                    Account Holder:
                </Typography>
                <Stack alignItems={"flex-end"}>
                    <Typography>
                        {name}
                    </Typography>
                    <Typography>
                        {phoneNumber}
                    </Typography>
                </Stack>
            </Stack>
            <Stack justifyContent={"space-between"} direction={"row"}>
                <Typography width={"50%"} color={"#7e7e7e"}>
                    Session date & time:
                </Typography>
                <Stack alignItems={"flex-end"}>
                    <Typography>
                        {sessionStartTime} - {sessionEndTime}
                    </Typography>
                    <Typography>
                        {sessionDate}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PaymentReviewInfo;