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
import {
  useGetUserDetailsByPhoneQuery,
  useLazyGetUserDetailsByPhoneQuery,
} from "../../../APIs/definitions/user";
import { usePayment } from "../../../hooks/usePayment";

interface PaymentFlowProps {
  open: boolean;
  onClose: () => void;
  payAgainPhoneNumber?: string;
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
  payAgainPhoneNumber,
}) => {
  const [activeDialog, setActiveDialog] = useState<DialogName>(DialogName.None);
  const [isPayeeStudent, setIsPayeeStudent] = useState<boolean>(false);
  const [stepOnBack, setStepOnBack] = useState<DialogName>(DialogName.None);
  const { data: tutorData } = useGetUserDetailsByPhoneQuery(
    payAgainPhoneNumber ?? ""
  );
  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    firstName: tutorData?.[0]?.first_name ?? "",
    lastName: tutorData?.[0]?.last_name ?? "",
    panNumber: tutorData?.[0]?.pan ?? "",
    phoneNumber: tutorData?.[0]?.phone ?? "",
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

  const { makePayment } = usePayment();

  const [getTutorDetials, { isLoading: tutorDetailsIsLoading }] =
    useLazyGetUserDetailsByPhoneQuery();

  const handleClose = () => {
    setActiveDialog(DialogName.None);
    onClose();
  };

  const handleTutorExistenceCheck = async (tutorphoneNumber: string) => {
    try {
      let isTutorOnboarded: boolean = false;
      let isPayeeStudent;
      await getTutorDetials(tutorphoneNumber)
        .unwrap()
        .then((res) => {
          const tutor = res[0];
          if (tutor?.role === "student") {
            setIsPayeeStudent(true);
            isPayeeStudent = true;
            return;
          }

          isTutorOnboarded = !!(
            tutor?.first_name &&
            tutor?.last_name &&
            tutor?.pan
          );

          console.log(isTutorOnboarded);

          if (!isTutorOnboarded) {
            setActiveDialog(DialogName.TutorDetails);
            setStepOnBack(DialogName.PaymentDetails);
            return;
          }

          localStorage.setItem("activePaymentPayeeUserId", tutor?.id);
          localStorage.setItem(
            "activePaymentTutorName",
            tutor?.first_name + " " + tutor?.last_name
          );

          const isTutorCashfreeRegistered = !!(
            tutor?.onboarding_status === "COMPLETE"
          );

          if (isTutorCashfreeRegistered) {
            setActiveDialog(DialogName.CompletePayment);
          } else {
            setActiveDialog(DialogName.CompletePayment);
          }
          setStepOnBack(DialogName.PaymentDetails);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Component rerendered because open is ", open);
    if (open) {
      setActiveDialog(DialogName.PaymentDetails);
    } else {
      setActiveDialog(DialogName.None);
    }
  }, [open]);

  return (
    <>
      {activeDialog === DialogName.PaymentDetails && (
        <PaymentDetailsDialog
          open={activeDialog === DialogName.PaymentDetails && open}
          onClose={handleClose}
          onSubmit={(data) => {
            setPaymentDetails(data);
            setTutorDetails((prev) => {
              return {
                ...prev,
                phoneNumber: data?.phoneNumber,
              };
            });
            localStorage.setItem(
              "activePaymentAmount",
              data?.amount.toString()
            );
            localStorage.setItem("activePaymentTutorId", data?.phoneNumber);
            handleTutorExistenceCheck(data?.phoneNumber);
          }}
          isPayeeStudent={isPayeeStudent}
          phoneNumberProp={tutorDetails.phoneNumber}
          submitButtonIsLoading={tutorDetailsIsLoading}
        />
      )}
      {activeDialog === DialogName.TutorDetails && (
        <TutorDetailsDialog
          open={activeDialog === DialogName.TutorDetails && open}
          onBack={() => {
            setActiveDialog(DialogName.PaymentDetails);
          }}
          onClose={handleClose}
          onSubmit={(data) => {
            setTutorDetails(data);
            setActiveDialog(DialogName.CompletePayment);
          }}
        />
      )}
      {/* {activeDialog === DialogName.CreateSession && ( */}
      {/* <CreateSessionDialog
        open={activeDialog === DialogName.CreateSession && open && false}
        onClose={handleClose}
        onBack={() => {
          setActiveDialog(stepOnBack);
        }}
        onSubmit={(data) => {
          setSessionDetails(data);
          setStepOnBack(DialogName.CreateSession);
          setActiveDialog(DialogName.CompletePayment);
        }}
        tutorDetails={tutorDetails}
        sessionDetails={sessionDetails}
        paymentDetails={paymentDetails}
      /> */}
      {/* )} */}
      {activeDialog === DialogName.CompletePayment && (
        <CompletePaymentDialog
          open={activeDialog === DialogName.CompletePayment && open}
          onClose={handleClose}
          onSubmit={() => {
            makePayment();
          }}
          onBack={() => {
            setActiveDialog(stepOnBack);
            setStepOnBack(DialogName.PaymentDetails);
          }}
        />
      )}
      {/* {activeDialog === DialogName.PaymentConfirmation && (
        <PaymentConfirmationDialog
          open={activeDialog === DialogName.PaymentConfirmation && open}
          onClose={handleClose}
        />
      )} */}
    </>
  );
};
export default PaymentFlow;
