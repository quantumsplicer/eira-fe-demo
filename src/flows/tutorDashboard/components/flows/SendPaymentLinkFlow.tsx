import React, { useState, useEffect } from "react";
import { Stack, Typography, Button } from "@mui/material";
import PaymentLinkDialog from "../../dialogs/PaymentLinkDialog";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import { PaymentLinkInput } from "../../interfaces";
import { useCreatePaymentLinkMutation } from "../../../../APIs/definitions/paymentLinks";
interface SendPaymentLinkFlowProps {
  isActive: boolean;
  onClose: () => void;
}

const SendPaymentLinkFlow: React.FC<SendPaymentLinkFlowProps> = ({
  isActive,
  onClose,
}) => {
  const [createPaymentLink, { isLoading, isSuccess, isError, error }] =
    useCreatePaymentLinkMutation();

  const [openPaymentLinkDialog, setOpenPaymentLinkDialog] =
    useState<boolean>(true);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const handleOnSuccessPaymentLinkDialog = () => {};

  const handleOnFailurePaymentLinkDialog = () => {};

  const handleOnClosePaymentLinkDialog = () => {
    setOpenPaymentLinkDialog(true);
    setOpenConfirmationDialog(false);
    onClose();
  };

  const handleOnSubmitPaymentLinkDialog = (data: PaymentLinkInput) => {
    createPaymentLink({
      receiver_phone: data.phoneNumber,
      amount: data.amount,
    })
      .unwrap()
      .then((response) => {
        console.log("Payment link created:", response);
        setOpenConfirmationDialog(true);
      })
      .catch((err) => {
        console.error("Error creating payment link:", err);
      });

    setOpenPaymentLinkDialog(false);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenPaymentLinkDialog(true);
    onClose();
  };
  useEffect(() => {
    setOpenPaymentLinkDialog(isActive);
  }, [isActive]);
  return (
    <>
      <PaymentLinkDialog
        open={openPaymentLinkDialog && isActive}
        onSuccess={handleOnSuccessPaymentLinkDialog}
        onFailure={handleOnFailurePaymentLinkDialog}
        onClose={handleOnClosePaymentLinkDialog}
        onSubmit={handleOnSubmitPaymentLinkDialog}
      />
      <ConfirmationDialog
        open={openConfirmationDialog && isActive}
        onClose={handleOnCloseConfirmationDialog}
        heading="Payment Link Created"
        subHeading="Your payment link has been successfully created and sent to the student."
      />
    </>
  );
};

export default SendPaymentLinkFlow;
