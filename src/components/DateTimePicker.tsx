import React from "react";
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import {
    FormControl,
    Stack,
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
        <FormControl fullWidth sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={2}>
                    <DatePicker
                        label="Date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        minDate={today}
                    // renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="Start time"
                        ampm={false}
                        value={startTime}
                        onChange={(newValue) => setStartTime(newValue)}
                        minTime={selectedDate && selectedDate.isSame(today, 'day') ? nextHour : today}
                    // renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="End time"
                        value={endTime}
                        ampm={false}
                        onChange={(newValue) => setEndTime(newValue)}
                        minTime={startTime ? startTime.add(1, 'hour').startOf('hour') : nextHour.add(1, 'hour').startOf('hour')}
                    // renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </FormControl>
    )
}

export default DateTimePicker;