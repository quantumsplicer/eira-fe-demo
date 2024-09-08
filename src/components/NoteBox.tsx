import React from "react";
import {
    Box,
    Typography
} from "@mui/material";

interface NoteBoxProps {
    heading?: string;
    notes: string[];
}

const NoteBox = ({ heading, notes }: NoteBoxProps) => {
    return (
        <Box
            sx={{
                mb: 4,
                backgroundColor: "#f9f9f9",
                padding: 2,
                borderRadius: 2,
            }}
        >
            <Typography variant="body2" fontSize={12}>
                {heading}
            </Typography>
            <ul>
                {
                    notes.map((note: string, index: number) => {
                        return (
                            <li key={index}>
                                <Typography variant="body2" fontSize={12}>
                                    {note}
                                </Typography>
                            </li>
                        )
                    })
                }
            </ul>
        </Box>
    )
}

export default NoteBox;