import React from "react";
import {
    Typography,
    Stack,
    Drawer,
    Box,
} from "@mui/material";
import tickMark from "../assets/images/png/tick-mark.png";
import crossMark from "../assets/images/png/cross-mark.png";
import InfoIcon from '@mui/icons-material/Info';

interface StatusDrawerProps {
    open: boolean;
    type: "success" | "failure" | "info";
    headingMessage: string;
    subHeadingMessage1: string;
    subHeadingMessage2?: string;
    preventDrawerClose: boolean;
    CustomDrawerButton?: React.FC;
}

const StatusDrawer = ({
    open,
    type,
    headingMessage,
    subHeadingMessage1,
    subHeadingMessage2,
    preventDrawerClose,
    CustomDrawerButton
}: StatusDrawerProps) => {

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "success":
                return <img
                    src={tickMark}
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        width: 80
                    }}
                />
            case "failure":
                return <img
                    src={crossMark}
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        width: 80
                    }}
                />
            case "info":
                return <InfoIcon
                    sx={{ mt: 5, fontSize: 90, color: "#bebebe" }}
                />
        }
    }

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity as needed
                    zIndex: 9999, // Higher than most background elements
                }}
                aria-hidden="true"
            />
            <Drawer
                open={open}
                sx={{
                    width: "100%",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        zIndex: 10000,
                        opacity: 1,
                        borderRadius: 5,
                        width: "100%",
                        boxSizing: 'border-box',
                        transition: 'transform 0.3s ease-in-out',
                    },
                }}
                variant={preventDrawerClose ? "permanent" : "persistent"}
                anchor="bottom"
            >
                <Stack
                    p={5}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Typography
                        variant="h5"
                        mb={3}
                        textAlign={"center"}
                        color={type === "success" ? "green" : "#000"}
                    >
                        {headingMessage}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        textAlign={"center"}
                    >
                        {subHeadingMessage1}
                    </Typography>
                    {
                        subHeadingMessage2 &&
                        <Typography
                            variant="subtitle2"
                            textAlign={"center"}
                        >
                            {subHeadingMessage2}
                        </Typography>
                    }
                    {getStatusIcon(type)}
                    {CustomDrawerButton &&
                        <CustomDrawerButton />
                    }
                </Stack>
            </Drawer>
        </>
    );
}

export default StatusDrawer;