import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import PaymentLinkDialog from "../dialogs/PaymentLinkDialog";

const CreatePaymentLinkCard: React.FC = () => {
  const [activeDialog, setActiveDialog] = useState<string>("None");
  const openDialog = () => {
    setActiveDialog("PaymentLinkDialog");
  };

  return (
    <Box
      sx={{
        pl: 6,
        pr: 6,
        borderRadius: 2,
        width: "100%",
        height: "140px",
        backgroundColor: "white",
        boxShadow: 6,
        alignContent: "center",
      }}
    >
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Stack p={1}>
          <Typography fontSize={22} fontWeight={600}>
            Create a Payment Link for Student
          </Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={openDialog}
          sx={{
            backgroundColor: "#507FFD",
            borderRadius: 3,
            fontSize: 16,
            height: 45,
            width: "25%",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Create Payment Link
        </Button>
      </Stack>
      <PaymentLinkDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
    </Box>
  );
};
export default CreatePaymentLinkCard;
