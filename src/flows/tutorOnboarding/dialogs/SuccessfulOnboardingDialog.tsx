// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    IconButton,
    Typography,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from "react-router-dom";

interface OTPDialogProps {
    open: boolean;
    onClose: () => void;
}

const SuccessfulOnboardingDialog = ({ open, onClose }: OTPDialogProps) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: 500,
                    maxWidth: "50vw",
                    height: 400,
                },
                p: 1,
            }}
        >
            <DialogContent dividers>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ height: "100%", pb: 10, pt: 10 }}
                >
                    <Typography
                        fontSize={26}
                        fontWeight="bold"
                    >
                        Congratulations!!
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: -5,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography>
                        You are ready to accept payments on Eira!
                    </Typography>
                    <Box>
                        <CheckCircleOutlineIcon color={"success"} sx={{ fontSize: 90, marginTop: "30px" }} />
                    </Box>
                    <Typography
                        onClick={onClose}
                        sx={{
                            borderBottom: "1px solid #757575",
                            cursor: "pointer",
                            color: theme => theme.palette.grey[600]
                        }}
                    >
                        Schedule a class now
                    </Typography>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default SuccessfulOnboardingDialog;
