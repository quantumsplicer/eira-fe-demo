import React from "react";
import {
    Typography,
} from "@mui/material";

interface AmountProps {
    amount: number;
    fontSize?: number;
}

const Amount = ({amount, fontSize}: AmountProps) => {

    const formatAmount = (amount:number|undefined) : string => {
        if(amount) {
            const amtStr = amount.toString();
            const [whole, decimal] = amtStr.split('.');
            const lastThreeDigits = whole.slice(-3);
            let otherDigits = whole.slice(0, -3);

            if (otherDigits.length > 0) {
                otherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',';
            }
            let formattedAmount = otherDigits + lastThreeDigits;

            if (decimal !== undefined) {
                formattedAmount += '.' + decimal;
            }
        
            return "₹ "+formattedAmount;
        }
        return "-"
    }

    return (
        <Typography
            variant="h5"
            display={"inline"}
            sx={{ fontSize: fontSize ? fontSize : 24 }}
            color={"#1F9254"}
            fontWeight={"bold"}
        >
            {formatAmount(amount)}
        </Typography>
    )
}

export default Amount;