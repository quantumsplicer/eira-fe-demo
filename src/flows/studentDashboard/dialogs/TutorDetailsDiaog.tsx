// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import AmountBreakupCard from "../../../components/AmountBreakupCard";

interface TutorDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
type Inputs = {
  firstName: string;
  lastName: string;
  panNumber: string;
};

const TutorDetailsDialog = ({
  open,
  onClose,
  onSubmit,
}: TutorDetailsDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handlePanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPanNumber(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          height: 520,
          borderRadius: 3,
          pl: 1,
          pr: 1,
        },
      }}
    >
      <DialogContent dividers>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box>
          <Stack direction="row" spacing={3}>
            <Box sx={{ pt: 4, pl: 2 }}>
              <Stack spacing={2}>
                <Stack spacing={0.5}>
                  <Typography fontSize={22} fontWeight={550}>
                    Making Payment to:
                  </Typography>
                  <Stack>
                    <Typography fontSize={22} fontWeight={650}>
                      Suneel Satpal
                    </Typography>
                    <Typography fontSize={15}>+919997945005</Typography>
                  </Stack>
                </Stack>
                <Box>
                  <AmountBreakupCard></AmountBreakupCard>
                </Box>
              </Stack>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Stack>
              <Stack justifyContent="center" alignItems="center" pt={2}>
                <Box>
                  <Alert
                    severity="warning"
                    sx={{
                      width: "400px",
                      borderRadius: "14px",
                      fontSize: 13,
                      pl: 6,
                      pt: 1,
                      pr: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: 12 }}>
                      Looks like the tutor is not onboarded!
                    </Typography>{" "}
                    <Typography sx={{ fontSize: 12 }}>
                      Onboard them with us now to make the payment
                    </Typography>
                  </Alert>
                </Box>
              </Stack>
              <Stack sx={{ pl: 4, pr: 4, pt: 2 }} spacing={4}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ pt: 0.5 }}
                >
                  <Typography sx={{ fontSize: 23, fontWeight: "bold" }}>
                    Tutor Details
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 550 }}>
                    Provide relevant details for their onboarding
                  </Typography>
                </Stack>
                <Stack spacing={2.5} sx={{ pt: 1 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    {...register("firstName", { required: true })}
                    sx={{ mb: 2 }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    {...register("lastName", {})}
                    sx={{ mb: 2 }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Pan"
                    variant="outlined"
                    {...register("panNumber", { required: true })}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Stack>
                <Box sx={{ pt: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    fullWidth
                    disabled={Object.keys(errors).length === 0 ? false : true}
                    sx={{
                      backgroundColor: "#507FFD",
                      borderRadius: 7,
                      fontSize: 15,
                      fontWeight: "bold",
                      paddingLeft: 3,
                      paddingRight: 3,
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TutorDetailsDialog;
