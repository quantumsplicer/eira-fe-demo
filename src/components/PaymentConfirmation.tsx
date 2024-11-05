import React from "react";
import PaymentInfo from "./PaymentInfo";
import {
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PaymentConfirmationProps {
    paymentDetails: Record<string, string>;
    name: string;
    amount: string;
}

const PaymentConfirmation = ({ name, paymentDetails, amount }: PaymentConfirmationProps) => {
    const navigate = useNavigate();

    return (
        <Stack alignItems={"center"}>
            <PaymentInfo
                amount={amount}
                name={name}
                paymentDetails={paymentDetails}
                type="success"
            />
            <Typography
                onClick={() => {
                    navigate("/student/dashboard");
                }}
                fontWeight={600}
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