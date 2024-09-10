import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import loginbg1 from '../../../assets/images/svg/loginbg1.svg';
import loginbg2 from '../../../assets/images/svg/loginbg2.svg';
import loginbg3 from '../../../assets/images/svg/loginbg3.svg';
import loginbg4 from '../../../assets/images/svg/loginbg4.svg';
import loginbg5 from '../../../assets/images/svg/loginbg5.svg';

const LoginBg = () => {
    return (
        <>
            <Stack
                direction={"row"}
                justifyContent={"space-evenly"}
            >
                <Box>
                    <img
                        style={{
                            height: "100vh"
                        }}
                        src={loginbg1}
                    />
                </Box>
                <Box>
                    <img
                        style={{
                            height: "100vh"
                        }}
                        src={loginbg2}
                    />
                </Box>
                <Box>
                    <img
                        style={{
                            height: "100vh"
                        }}
                        src={loginbg3}
                    />
                </Box>
                <Box>
                    <img
                        style={{
                            height: "100vh"
                        }}
                        src={loginbg4}
                    />
                </Box>
                <Box>
                    <img
                        style={{
                            height: "100vh"
                        }}
                        src={loginbg5}
                    />
                </Box>
            </Stack>
            <Typography
                width={"220px"}
                position={"absolute"}
                bottom={"53%"}
                left={"3%"}
                color={"white"}
                variant="h4"
            >
                accept your tuition fees @ just
            </Typography>
            <Typography
                position={"absolute"}
                bottom={"45%"}
                left={"10%"}
                color={"white"}
                variant="h2"
                fontWeight={"bold"}
            >
                1%
            </Typography>
            <Typography
                position={"absolute"}
                bottom={"22%"}
                left={"45%"}
                color={"white"}
                variant="h2"
                fontWeight={"bold"}
            >
                99.99%
            </Typography>
            <Typography
                width={"220px"}
                position={"absolute"}
                bottom={"10%"}
                left={"45%"}
                color={"white"}
                variant="h4"
            >
                on time settlements
            </Typography>
        </>
    )
}

export default LoginBg;