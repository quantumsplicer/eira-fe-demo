// // src/components/SlotBookingPage.tsx
// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Container,
//   Stack,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Chip,
//   OutlinedInput
// } from '@mui/material';
// import EiraBack1 from '../../../assets/images/png/eira-back-1.png';
// import EiraLogo from '../../../assets/images/png/eira-logo.png';
// import {DatePicker, TimePicker} from '@mui/lab';
// import { LocalizationProvider } from '@mui/lab';

// const SlotBookingPage: React.FC = () => {
//   const [sessionTitle, setSessionTitle] = useState('');
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [startTime, setStartTime] = useState<Date | null>(new Date());
//   const [endTime, setEndTime] = useState<Date | null>(new Date());
//   const [attendees, setAttendees] = useState<string[]>([]);
//   const [description, setDescription] = useState('');

//   const handleSessionTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSessionTitle(event.target.value);
//   };

//   const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDescription(event.target.value);
//   };

//   const handleAttendeesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setAttendees(event.target.value as string[]);
//   };

//   return (
//     <Stack
//       direction="row"
//       sx={{
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
//         <img src={EiraBack1} style={{ width: "100%", height: "100%" }} />
//       </Box>
//       <Stack sx={{ width: "50%" }} alignItems={"center"}>
//         <img
//           src={EiraLogo}
//           style={{
//             alignSelf: "flex-start",
//             width: 80,
//             position: "absolute",
//             marginLeft: 20,
//             top: 20,
//           }}
//         />
//         <Stack
//           justifyContent={"center"}
//           alignItems={"center"}
//           sx={{ width: "80%", px: 18 }}
//         >
//           <Typography
//             variant="h5"
//             sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
//           >
//             Create Session
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             sx={{ fontSize: 16, mb: 4, textAlign: "center" }}
//           >
//             create session for your students
//           </Typography>
//           <TextField
//             fullWidth
//             label="Session Title"
//             variant="outlined"
//             value={sessionTitle}
//             onChange={handleSessionTitleChange}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="Add date and time"
//                 value={selectedDate}
//                 onChange={(newValue) => setSelectedDate(newValue)}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//               <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//                 <TimePicker
//                   label="Start time"
//                   value={startTime}
//                   onChange={(newValue) => setStartTime(newValue)}
//                   renderInput={(params) => <TextField {...params} />}
//                 />
//                 <TimePicker
//                   label="End time"
//                   value={endTime}
//                   onChange={(newValue) => setEndTime(newValue)}
//                   renderInput={(params) => <TextField {...params} />}
//                 />
//               </Stack>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Repeat</InputLabel>
//                 <Select
//                   value="Daily"
//                   label="Repeat"
//                   fullWidth
//                 >
//                   <MenuItem value="Daily">Daily</MenuItem>
//                   <MenuItem value="Weekly">Weekly</MenuItem>
//                   <MenuItem value="Monthly">Monthly</MenuItem>
//                 </Select>
//               </FormControl>
//             </LocalizationProvider>
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Add Attendees</InputLabel>
//             <Select
//               multiple
//               value={attendees}
//               onChange={handleAttendeesChange}
//               input={<OutlinedInput label="Add Attendees" />}
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                   {selected.map((value) => (
//                     <Chip key={value} label={value} />
//                   ))}
//                 </Box>
//               )}
//             >
//               {['manuseth30@gmail.com', 'mseth@me.iitr.ac.in'].map((email) => (
//                 <MenuItem key={email} value={email}>
//                   {email}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Description"
//             variant="outlined"
//             value={description}
//             onChange={handleDescriptionChange}
//             sx={{ mb: 2 }}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ padding: 1.5, borderRadius: 2 }}
//             onClick={() => alert("Proceed to pay")}
//           >
//             Proceed to pay
//           </Button>
//           <Stack
//             direction="row"
//             spacing={1}
//             sx={{
//               mt: 4,
//               textAlign: "center",
//               position: "absolute",
//               bottom: 20,
//             }}
//           >
//             <a
//               href="https://google.com"
//               target="_blank"
//               style={{ textDecoration: "none" }}
//             >
//               <Typography variant="body2" color="grey">
//                 privacy policies
//               </Typography>
//             </a>
//             <Typography variant="body2" color="grey">
//               |
//             </Typography>
//             <a
//               href="https://google.com"
//               target="_blank"
//               style={{ textDecoration: "none" }}
//             >
//               <Typography variant="body2" color="grey">
//                 terms of use
//               </Typography>
//             </a>
//           </Stack>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default SlotBookingPage;
export {}