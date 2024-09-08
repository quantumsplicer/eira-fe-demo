import React from "react";
import PaymentInfo from "./PaymentInfo";
import {
    Stack,
    Typography,
} from "@mui/material";

interface PaymentConfirmationProps {
    paymentDetails: Record<string, string[]>;
    name: string;
    amount: string;
}

const PaymentConfirmation = ({ name, paymentDetails, amount }: PaymentConfirmationProps) => {

    return (
        <Stack alignItems={"center"}>
            <PaymentInfo
                amount={amount}
                name={name}
                paymentDetails={paymentDetails}
                type="success"
            />
            <Typography
                // onClick={}
                mt={3}
                sx={{
                    borderBottom: "1px solid #757575",
                    cursor: "pointer",
                    color: theme => theme.palette.grey[600]
                }}
            >
                Go to Dashboard
            </Typography>
        </Stack>
    )
}

export default PaymentConfirmation;