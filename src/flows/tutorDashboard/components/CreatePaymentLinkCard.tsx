import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import PaymentLinkDialog from "../dialogs/PaymentLinkDialog";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";

const CreatePaymentLinkCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const heading = "Link Successfully Created";
  const subHeading =
    "your payment link is created and sent to the student on their whatsapp and SMS";
  const [activeDialog, setActiveDialog] = useState<string>("None");
  const openDialog = () => {
    setActiveDialog("PaymentLinkDialog");
  };

  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              pl: 6,
              pr: 6,
              borderRadius: 2,
              width: "100%",
              height: "140px",
              backgroundColor: "white",
              boxShadow: 6,
              alignContent: "center",
            }
          : {
              p: 4,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              alignContent: "center",
            }
      }
    >
      <Stack
        direction={!isPhoneScreen ? "row" : "column"}
        justifyContent="space-between"
        sx={!isPhoneScreen ? {} : { alignItems: "center" }}
        spacing={!isPhoneScreen ? 0 : 2}
      >
        <Stack p={1}>
          <Typography
            fontSize={!isPhoneScreen ? 22 : 26}
            fontWeight={!isPhoneScreen ? 600 : 500}
            sx={!isPhoneScreen ? {} : { textAlign: "center" }}
          >
            Create a Payment Link for Student
          </Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={openDialog}
          sx={
            !isPhoneScreen
              ? {
                  backgroundColor: "#507FFD",
                  borderRadius: 3,
                  fontSize: 16,
                  height: 45,
                  width: "25%",
                  textTransform: "none",
                  fontWeight: 600,
                }
              : {
                  backgroundColor: "#507FFD",
                  borderRadius: 3,
                  fontSize: 16,
                  height: 60,
                  width: "70%",
                  textTransform: "none",
                  fontWeight: 600,
                }
          }
        >
          Create Payment Link
        </Button>
      </Stack>
      <PaymentLinkDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
      <ConfirmationDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
        heading={heading}
        subHeading={subHeading}
      />
    </Box>
  );
};
export default CreatePaymentLinkCard;
