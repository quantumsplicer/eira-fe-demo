import React from "react";
import {
    Typography,
} from "@mui/material";

interface AmountProps {
    amount: string;
}

const Amount = ({amount}: AmountProps) => {
    return (
        <Typography
            variant="h5"
            sx={{ fontSize: 20 }}
            color={"#1F9254"}
            fontWeight={"bold"}
        >
            ₹ {amount}
        </Typography>
    )
}

export default Amount;