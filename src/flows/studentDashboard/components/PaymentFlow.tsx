import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import CompletePaymentDialog from "../dialogs/CompletePaymentDialog";
import TutorDetailsDialog from "../dialogs/TutorDetailsDiaog";
import PaymentDetailsDialog from "../dialogs/PaymentDetailsDialog";
import CreateSessionDialog from "../dialogs/CreateSessionDialog";
import PaymentConfirmationDialog from "../dialogs/PaymentConfirmationDialog";
import { TutorDetails, SessionDetails, PaymentDetails } from "../interfaces";

interface PaymentFlowProps {
  open: boolean;
  onClose: () => void;
  tutorDetailsProp: TutorDetails;
}
enum DialogName {
  None = "None",
  PaymentDetails = "PaymentDetails",
  TutorDetails = "TutorDetails",
  CreateSession = "CreateSession",
  CompletePayment = "CompletePayment",
  PaymentConfirmation = "PaymentConfirmation",
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  open,
  onClose,
  tutorDetailsProp,
}) => {
  const [activeDialog, setActiveDialog] = useState<DialogName>(DialogName.None);
  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    firstName: tutorDetailsProp.firstName,
    lastName: tutorDetailsProp.lastName,
    panNumber: tutorDetailsProp.panNumber,
    phoneNumber: tutorDetailsProp.phoneNumber,
  });
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>({
    sessionTitle: "",
    description: "",
    date: null,
    startTime: null,
    endTime: null,
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    phoneNumber: "",
    amount: 0,
  });
  const handleClose = () => {
    setActiveDialog(DialogName.None);
    onClose();
  };
  useEffect(() => {
    console.log("Component rerendered because open is ", open);
    console.log("In this render, tutor details are  ", tutorDetailsProp);
    if (open) {
      setActiveDialog(DialogName.PaymentDetails);
    } else {
      setActiveDialog(DialogName.None);
    }
  }, [open]);
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  return (
    <>
      <PaymentDetailsDialog
        open={activeDialog === DialogName.PaymentDetails && open}
        onClose={handleClose}
        onSubmit={(data) => {
          setPaymentDetails(data);
          setActiveDialog(DialogName.TutorDetails);
        }}
        phoneNumberProp={tutorDetails.phoneNumber}
      />
      <TutorDetailsDialog
        open={activeDialog === DialogName.TutorDetails && open}
        onBack={() => {
          setActiveDialog(DialogName.PaymentDetails);
        }}
        onClose={handleClose}
        onSubmit={(data) => {
          setTutorDetails(data);
          setActiveDialog(DialogName.CreateSession);
        }}
        tutorDetails={tutorDetailsProp}
        paymentDetails={paymentDetails}
      />
      <CreateSessionDialog
        open={activeDialog === DialogName.CreateSession && open}
        onClose={handleClose}
        onBack={() => {
          setActiveDialog(DialogName.TutorDetails);
        }}
        onSubmit={(data) => {
          setSessionDetails(data);
          setActiveDialog(DialogName.CompletePayment);
        }}
        tutorDetails={tutorDetails}
        sessionDetails={sessionDetails}
        paymentDetails={paymentDetails}
      />
      <CompletePaymentDialog
        open={activeDialog === DialogName.CompletePayment && open}
        onClose={handleClose}
        onSubmit={() => {
          setActiveDialog(DialogName.PaymentConfirmation);
        }}
        onBack={() => {
          setActiveDialog(DialogName.CreateSession);
        }}
        tutorDetails={tutorDetails}
        sessionDetails={sessionDetails}
        paymentDetails={paymentDetails}
      />
      <PaymentConfirmationDialog
        open={activeDialog === DialogName.PaymentConfirmation && open}
        onClose={handleClose}
      />
    </>
  );
};
export default PaymentFlow;
