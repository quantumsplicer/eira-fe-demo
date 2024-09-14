import { Stack, Typography } from "@mui/material";
import Secure from "../assets/images/svg/Secure.svg";
import React from "react";

const SafeLogo = () => {
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            // alignSelf={"flex-end"}
        >
            <img
                src={Secure}
                style={{
                    height: "50px",
                    width: "50px"
                }}
            />
            <Typography
                color={"white"}
                fontWeight={"bold"}
            >
                100% safe
            </Typography>
        </Stack>
    )
}

export default SafeLogo;