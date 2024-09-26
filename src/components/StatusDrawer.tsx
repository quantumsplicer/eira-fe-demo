import React from "react";
import {
    Typography,
    Stack,
    Drawer,
} from "@mui/material";
import tickMark from "../assets/images/png/tick-mark.png";
import crossMark from "../assets/images/png/cross-mark.png";

interface StatusDrawerProps {
    open: boolean;
    type: string;
    headingMessage: string;
    subHeadingMessage1: string;
    subHeadingMessage2?: string;
    preventDrawerClose: boolean;
    CustomDrawerButton: React.FC;
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

    return (
        <Drawer
            open={open}
            sx={{
                width: "100%",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
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
                {
                    type === "success" ?
                        <img
                            src={tickMark}
                            style={{
                                marginTop: "30px",
                                marginBottom: "30px",
                                width: 80
                            }}
                        /> :
                        <img
                            src={crossMark}
                            style={{
                                marginTop: "30px",
                                marginBottom: "30px",
                                width: 80
                            }}
                        />
                }
                <CustomDrawerButton />
            </Stack>
        </Drawer>
    );
}

export default StatusDrawer;