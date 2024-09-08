import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import EiraBack from '../../../assets/images/svg/EiraBack.svg';
import Secure from '../../../assets/images/svg/Secure.svg'

const Back1 = () => {
    return (
        <>
            <Box
                zIndex={-1}
            >
                <img style={{height: "100%" , width: "100%"}} src={EiraBack} />
            </Box>
            <Typography
                position={"absolute"}
                left={50}
                top={"35%"}
                color={"white"}
                variant="h3"
                width={"30%"}
                fontWeight={"bold"}
            >
                Tuitions made accessible than ever before with Eira
            </Typography>
            <Stack
                position={"absolute"}
                direction={"row"}
                bottom={30}
                left={50}
                alignItems={"center"}
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
        </>
    )
}

export default Back1;