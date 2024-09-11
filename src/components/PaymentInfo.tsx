import React from "react";
import {
    Stack,
    Typography,
    Box
} from "@mui/material";
import Amount from "./Amount";
import tickMark from '../assets/images/png/tick-mark.png'

interface PaymentInfoProps {
    amount: string;
    name: string;
    paymentDetails: Record<string, string[]>;
    type: string;
}

const PaymentInfo = ({ amount, name, paymentDetails, type }: PaymentInfoProps) => {

    const infoKeys = Object.keys(paymentDetails)

    return (
        <>
            <Stack
                direction={"row"}
                alignItems={"center"}
            >
                <Typography
                    variant="h5"
                    sx={{ fontSize: 20 }}
                    color={"#969696"}
                    mr={1}
                >
                    {
                        type === "review" ?
                            "paying" :
                            "Sent"
                    }
                </Typography>
                <Amount amount={amount} />
            </Stack>
            <Stack
                direction={"row"}
                alignItems={"center"}
            >
                <Typography
                    variant="h5"
                    sx={{ fontSize: 20 }}
                    color={"#969696"}
                    mr={1}
                >
                    to
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
            {
                type === "success" &&
                <img
                    src={tickMark}
                    style={{
                        marginTop: "30px",
                        width: 90
                    }}
                />
            }
            {
                type === "success" &&
                <Box
                    mt={3}
                >
                    <Typography
                        color={"#7e7e7e"}
                        component={"span"}
                        fontWeight={"bold"}
                    >
                        Settlement on
                    </Typography>
                    <Typography
                        component={"span"}
                        fontWeight={"bold"}
                    >
                        {` 7th October`}
                    </Typography>
                    <Typography
                        component={"span"}
                        color={"#7e7e7e"}
                        fontWeight={"bold"}
                    >
                        {` at`}
                    </Typography>
                    <Typography
                        component={"span"}
                        fontWeight={"bold"}
                    >
                        {` 5:00pm`}
                    </Typography>
                </Box>
            }
            {
                type === "review" &&
                <Typography
                    variant="subtitle1"
                    sx={{ fontSize: 14, mt: 3, textAlign: "center" }}
                >
                    Confirm payment details and make payment
                </Typography>
            }
            <Box width={"100%"} mt={5}>
                <Stack>
                    {
                        infoKeys.map((key, index) => {
                            return (
                                <Stack justifyContent={"space-between"} direction={"row"} mb={2} key={index}>
                                    <Typography width={"50%"} color={"#7e7e7e"}>
                                        {key}:
                                    </Typography>
                                    <Stack alignItems={"flex-end"}>
                                        {
                                            paymentDetails[key].map((value, index) => {
                                                return (
                                                    <Typography key={index}>
                                                        {value}
                                                    </Typography>
                                                )
                                            })
                                        }
                                    </Stack>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Box>
        </>
    )
}

export default PaymentInfo;