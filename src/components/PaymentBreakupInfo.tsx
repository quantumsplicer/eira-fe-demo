import { Box, Stack, Typography, Divider } from "@mui/material";
import React from "react";
import AmountBreakupCard from "./AmountBreakupCard";

interface PaymentBreakupInfoProps {
    name: string;
    phone: string;
    amount: number;
    settlementDate: string;
    settlementTime: string;
}

const PaymentBreakupInfo = ({name, phone, amount, settlementDate, settlementTime}: PaymentBreakupInfoProps) => {
    return (
        <Box>
            <Stack
                direction={"row"}
                justifyContent={"space-evenly"}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"space-between"}
                >
                    <Typography
                        fontSize={24}
                        mt={3}
                    >
                        Making payment to:
                    </Typography>
                    <Stack
                        mb={3}
                    >
                        <Typography
                            fontSize={22}
                            fontWeight={"bold"}
                        >
                            {name}
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontWeight={"bold"}
                            color={"#7e7e7e"}
                        >
                            {phone}
                        </Typography>
                    </Stack>

                </Stack>
                <Box
                    height="300px"
                    width="400px"
                    bgcolor={"#F5F5F5"}
                    pt={2}
                    pb={2}
                    borderRadius={5}
                >
                    <AmountBreakupCard
                        amount={amount}
                        settlementDate={settlementDate}
                        settlementTime={settlementTime}
                    />
                </Box>
            </Stack>
        </Box>
    )
}

export default PaymentBreakupInfo;