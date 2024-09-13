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
  const [amount, setAmount] = useState<number>(0);
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 6,
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-around",
        }}
        width="fullwidth"
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Button
              variant="contained"
              onClick={() => {
                setActiveDialog("PaymentDetailsDialog");
              }}
              sx={{
                backgroundColor: "#507FFD",
                borderRadius: 3,
                fontSize: 20,
                fontWeight: 600,
                height: 90,
                paddingLeft: 8,
                paddingRight: 8,
                textTransform: "none",
              }}
            >
              Make a new Payment
            </Button>
            <Stack direction="row" spacing={1}>
              <Typography fontSize={20} fontWeight={500}>
                Make a payment through Credit
              </Typography>
              <Typography fontSize={20} fontWeight="bold">
                @ just 1%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box>
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
        onSubmit={(value: number) => {
          setActiveDialog("TutorDetailsDialog");
          setAmount(value);
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
        amount={amount}
      />
      <CreateSessionDialog
        open={activeDialog === "CreateSessionDialog" ? true : false}
        onClose={() => {
          setActiveDialog("None");
        }}
        onSubmit={() => {
          setActiveDialog("CompletePaymentDialog");
        }}
        amount={amount}
      />
      <CompletePaymentDialog
        open={activeDialog === "CompletePaymentDialog" ? true : false}
        onClose={() => {
          setActiveDialog("None");
        }}
        onSubmit={() => {
          setActiveDialog("PaymentConfirmationDialog");
        }}
        amount={amount}
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
