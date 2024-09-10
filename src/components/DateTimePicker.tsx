import React from "react";
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import {
    Box,
    FormControl,
    Stack
} from "@mui/material";
import {
    DatePicker,
    TimePicker,
    LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateTimePickerProps {
    selectedDate: Dayjs | null;
    setSelectedDate: (date: Dayjs | null) => void;
    startTime: Dayjs | null;
    setStartTime: (time: Dayjs | null) => void;
    endTime: Dayjs | null;
    setEndTime: (time: Dayjs | null) => void;
}

const DateTimePicker = ({ selectedDate, setSelectedDate, startTime, setStartTime, endTime, setEndTime }: DateTimePickerProps) => {

    const today = dayjs().startOf('day');
    const now = dayjs();
    const nextHour = now.add(1, 'hour').startOf('hour');

    return (
        <FormControl fullWidth sx={{ mb: 5 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={2}>
                    <Box width={"40%"}>
                        <Box
                            component="label"
                            sx={{
                                position: 'relative',
                                top: -3,
                                left: 1,
                                fontSize: 12,
                                color: 'rgba(0, 0, 0, 0.6)',
                                pointerEvents: 'none',
                            }}
                        >
                            Add date *
                        </Box>
                        <DatePicker
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: 45,
                                },
                                "& .MuiOutlinedInput-input": {
                                    padding: "12px 5px",
                                    fontSize: 14,
                                },
                            }}
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            minDate={today}
                        />
                    </Box>
                    <Box width={"30%"}>
                        <Box
                            component="label"
                            sx={{
                                position: 'relative',
                                top: -3,
                                left: 1,
                                fontSize: 12,
                                color: 'rgba(0, 0, 0, 0.6)',
                                pointerEvents: 'none',
                            }}
                        >
                            Start time *
                        </Box>
                        <TimePicker
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: 45,
                                },
                                "& .MuiOutlinedInput-input": {
                                    padding: "12px 5px",
                                    fontSize: 14,
                                },
                            }}
                            ampm={false}
                            value={startTime}
                            onChange={(newValue) => setStartTime(newValue)}
                            minTime={selectedDate && selectedDate.isSame(today, 'day') ? nextHour : today}
                        />
                    </Box>
                    <Box width="30%">
                        <Box
                            component="label"
                            sx={{
                                position: 'relative',
                                top: -3,
                                left: 1,
                                fontSize: 12,
                                color: 'rgba(0, 0, 0, 0.6)',
                                pointerEvents: 'none',
                            }}
                        >
                            End time *
                        </Box>
                        <TimePicker
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: 45,
                                },
                                "& .MuiOutlinedInput-input": {
                                    padding: "12px 5px",
                                    fontSize: 14,
                                },
                            }}
                            value={endTime}
                            ampm={false}
                            onChange={(newValue) => setEndTime(newValue)}
                            minTime={startTime ? startTime.add(1, 'hour').startOf('hour') : nextHour.add(1, 'hour').startOf('hour')}
                        />
                    </Box>
                </Stack>
            </LocalizationProvider>
        </FormControl>
    )
}

export default DateTimePicker;