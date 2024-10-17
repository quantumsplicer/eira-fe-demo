import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const CustomProgressIndicator = () => {
    return (
        <>
            <Stack
                direction={"row"}
                width="280px"
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box
                    width="20px"
                    height="20px"
                    borderRadius={"50%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        borderColor: "#000",
                        borderStyle: "solid",
                        borderWidth: "2px"
                    }}
                >
                    <Box
                        width="50%"
                        height="50%"
                        bgcolor="#000"
                        borderRadius={"50%"}
                    />
                </Box>
                <Divider
                    variant="fullWidth"
                    sx={{
                        width: "35%",
                        borderStyle: "solid",
                        height: 1,
                        borderColor: "#aeaeae"
                    }}
                />
                <Box
                    width="20px"
                    height="20px"
                    borderRadius={"50%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        borderColor: "#000",
                        borderStyle: "solid",
                        borderWidth: "2px"
                    }}
                >
                    <Box
                        width="50%"
                        height="50%"
                        bgcolor="#aeaeae"
                        borderRadius={"50%"}
                    />
                </Box>
                <Divider
                    variant="fullWidth"
                    sx={{
                        width: "35%",
                        borderStyle: "solid",
                        height: 1,
                        borderColor: "#aeaeae"
                    }}
                />
                <Box
                    width="20px"
                    height="20px"
                    borderRadius={"50%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        borderStyle: "solid",
                        borderColor: "#000",
                        borderWidth: "1px"
                    }}
                >
                    <Box
                        width="50%"
                        height="50%"
                        bgcolor="#fff"
                        borderRadius={"50%"}
                    />
                </Box>
            </Stack>
            <Stack
                width="370px"
                justifyContent={"space-between"}
                direction={"row"}
            >
                <Box
                    width={"33%"}
                >
                <Typography
                    textAlign={"center"}   
                >
                    Personal Details
                </Typography>
                </Box>
                <Box
                    width={"33%"}
                >
                <Typography
                    textAlign={"center"}
                >
                    Account Details
                </Typography>
                </Box>
                <Box
                    width={"33%"}
                >
                <Typography
                    textAlign={"center"}
                    width={"90%"}
                >
                    Verify Aadhaar
                </Typography>
                </Box>
            </Stack>
        </>
    )
}

export default CustomProgressIndicator;