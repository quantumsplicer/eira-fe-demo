import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopyOutlined";
import Button from "@mui/material/Button";
import PaymentLinkBannerArt from "../../../assets/images/svg/PaymentLinkBannerArt.svg";
import CompletePaymentDialog from "../dialogs/CompletePaymentDialog";
import TutorDetailsDialog from "../dialogs/TutorDetailsDiaog";
import PaymentDetailsDialog from "../dialogs/PaymentDetailsDialog";
import CreateSessionDialog from "../dialogs/CreateSessionDialog";
import PaymentConfirmationDialog from "../dialogs/PaymentConfirmationDialog";
const amount = 20000;
const PaymentBannerCard: React.FC = () => {
  const [activeDialog, setActiveDialog] = useState<string>("None");
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 6,
        alignContent: "center",
        width: "100%",
        height: "260px",
      }}
    >
      <Stack
        justifyContent="space-between"
        direction="row"
        sx={{}}
        pr={20}
        pl={5}
      >
        <Stack sx={{}} spacing={2} pt={3}>
          <Button
            variant="contained"
            onClick={() => {
              setActiveDialog("PaymentDetailsDialog");
            }}
            sx={{
              backgroundColor: "#507FFD",
              borderRadius: 3,
              fontSize: 18,
              fontWeight: "bold",
              height: 80,
              paddingLeft: 3,
              paddingRight: 3,
            }}
          >
            Make a New Payment
          </Button>
          <Typography>Make a payment through credit @just 1%</Typography>
        </Stack>
        <Box
          sx={{
            height: "250px",
            width: "250px",
          }}
        >
          <img
            src={PaymentLinkBannerArt}
            style={{
              width: "250px",
              height: "250x",
            }}
          />
        </Box>
      </Stack>
      <PaymentDetailsDialog
        open={activeDialog === "PaymentDetailsDialog" ? true : false}
        onClose={() => {
          setActiveDialog("None");
        }}
        onSubmit={() => {
          setActiveDialog("TutorDetailsDialog");
        }}
      />
      <TutorDetailsDialog
        open={activeDialog === "TutorDetailsDialog" ? true : false}
        onClose={() => {
          setActiveDialog("None");
        }}
        onSubmit={() => {
          setActiveDialog("CreateSessionDialog");
        }}
      />
      <CreateSessionDialog
        open={activeDialog === "CreateSessionDialog" ? true : false}
        onClose={() => {
          setActiveDialog("None");
        }}
        onSubmit={() => {
          setActiveDialog("CompletePaymentDialog");
        }}
      />
      <CompletePaymentDialog
        open={activeDialog === "CompletePaymentDialog" ? true : false}
        onClose={() => {
          setActiveDialog("None");
        }}
        onSubmit={() => {
          setActiveDialog("PaymentConfirmationDialog");
        }}
      />
      <PaymentConfirmationDialog
        open={activeDialog === "PaymentConfirmationDialog" ? true : false}
        onClose={() => {
          setActiveDialog("None");
        }}
      />
    </Box>
  );
};
export default PaymentBannerCard;
