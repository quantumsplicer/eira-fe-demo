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
  usePrefillOnboardingMutation,
} from "../../../APIs/definitions/user";
import { usePayment } from "../../../hooks/usePayment";
import { ACTIVE_PG } from "../../payTutionFees/pages/InputPaymentDetails";
import StatusDialog from "../../../dialogs/StatusDialog";
import StatusDrawer from "../../../components/StatusDrawer";
import { trackEvent } from "../../../utils/amplitude";

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
  const notPhoneScreen = useMediaQuery("(min-width:850px)");

  const { data: tutorData } = useGetUserDetailsByPhoneQuery(
    payAgainPhoneNumber as string,
    { skip: !payAgainPhoneNumber }
  );

  const [activeDialog, setActiveDialog] = useState<DialogName>(DialogName.None);
  const [isPayeeStudent, setIsPayeeStudent] = useState<boolean>(false);
  const [stepOnBack, setStepOnBack] = useState<DialogName>(DialogName.None);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

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
    amount: "",
  });

  const { makePayment, errorMessage } = usePayment();

  const [getTutorDetials, { isLoading: tutorDetailsIsLoading }] =
    useLazyGetUserDetailsByPhoneQuery();

  const [triggerPrefillOnboarding, { isLoading: prefillDataIsLoading }] =
    usePrefillOnboardingMutation();

  const handleClose = () => {
    setActiveDialog(DialogName.None);
    onClose();
  };

  const handleTutorExistenceCheck = async (tutorphoneNumber: string) => {
    try {
      let tutorExists: boolean = false;
      let isPayeeStudent;
      await getTutorDetials(tutorphoneNumber)
        .unwrap()
        .then(async (res) => {
          const tutor = res[0];
          if (tutor?.role === "student") {
            setIsPayeeStudent(true);
            isPayeeStudent = true;
            return;
          }

          tutorExists = !!(tutor?.first_name && tutor?.last_name && tutor?.pan);

          let returnFunction = false;

          if (!tutorExists) {
            await triggerPrefillOnboarding({
              phone: tutorphoneNumber,
              register_user: true,
              amount: Number(paymentDetails?.amount),
            })
              .unwrap()
              .then((result) => {
                if (result) {
                  localStorage.setItem("autoFillDetails", "true");

                  const firstName = result?.first_name;
                  const lastName = result?.last_name;
                  const pan = result?.pan;

                  localStorage.setItem("firstName", firstName ?? "");
                  localStorage.setItem("lastName", lastName ?? "");
                  localStorage.setItem("pan", pan ?? "");

                  if (!pan || !firstName || !lastName) {
                    setActiveDialog(DialogName.TutorDetails);
                    setStepOnBack(DialogName.PaymentDetails);
                    returnFunction = true;
                  }
                }
              });
          }

          if (returnFunction) return;

          const pgOnboardingStatus =
            tutor?.pg_onboarding_status.length > 0
              ? tutor?.pg_onboarding_status.find(
                  (item) => item?.pg_name === ACTIVE_PG
                )?.status
              : "NONE";

          switch (pgOnboardingStatus) {
            case "NONE":
            case "INITIATED":
            case "EMAIL_VERIFIED":
            case "MIN_KYC_PENDING":
            case "MIN_KYC_REJECTED":
              setShowMessage(true);
              setMessage(
                "KYC link is sent to your tutor. Tutor will be able to accept payments after completion of KYC"
              );
              break;
            case "MIN_KYC_SUBMITTED":
              setShowMessage(true);
              setMessage(
                "Your tutor's KYC is completed and your tutor will be able to accept payments in 2-3 business days"
              );
              break;
            case "MIN_KYC_APPROVED":
            case "ACTIVE":
              localStorage.setItem("activePaymentPayeeUserId", tutor?.id);
              localStorage.setItem(
                "activePaymentTutorName",
                tutor?.first_name + " " + tutor?.last_name
              );
              setActiveDialog(DialogName.CompletePayment);
              setStepOnBack(DialogName.PaymentDetails);
              break;
            default:
              break;
          }

          // localStorage.setItem("activePaymentPayeeUserId", tutor?.id);
          // localStorage.setItem(
          //   "activePaymentTutorName",
          //   tutor?.first_name + " " + tutor?.last_name
          // );

          // const isTutorCashfreeRegistered = !!(
          //   tutor?.onboarding_status === "COMPLETE"
          // );

          // if (isTutorCashfreeRegistered) {
          //   setActiveDialog(DialogName.CompletePayment);
          // } else {
          //   setActiveDialog(DialogName.CreateSession);
          // }
          // setStepOnBack(DialogName.PaymentDetails);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const goToDashboardButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: 1.5,
          borderRadius: 20,
          height: 45,
          mt: 5,
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
        }}
        onClick={() => {
          trackEvent("Clicked Go to Dashboard");
          onClose();
        }}
      >
        Go to Dashboard
      </Button>
    );
  };

  useEffect(() => {
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
          onInputNumber={(value) => {
            handleTutorExistenceCheck(value);
          }}
          isPayeeStudent={isPayeeStudent}
          phoneNumberProp={payAgainPhoneNumber ?? ""}
          submitButtonIsLoading={tutorDetailsIsLoading || prefillDataIsLoading}
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
            setShowMessage(true);
            setMessage(
              "KYC link is sent to your tutor. Tutor will be able to accept payments after completion of KYC"
            );
            // setActiveDialog(DialogName.CreateSession);
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
          onClose={() => {
            trackEvent("Closed Payment Review Dialog");
            handleClose();
          }}
          onSubmit={() => {
            makePayment();
          }}
          errorMessage={errorMessage ? errorMessage : null}
          onBack={() => {
            trackEvent("Clicked Back from Payment Review");
            setActiveDialog(stepOnBack);
            setStepOnBack(DialogName.PaymentDetails);
          }}
        />
      )}

      {showMessage ? (
        notPhoneScreen ? (
          <StatusDialog
            open={showMessage}
            onClose={() => setShowMessage(false)}
            type="info"
            headingMessage=""
            subHeadingMessage={message}
            preventDialogClose={false}
            CustomDialogButton={goToDashboardButton}
          />
        ) : (
          <StatusDrawer
            open={showMessage}
            type="info"
            headingMessage=""
            subHeadingMessage1={message}
            preventDrawerClose={false}
            CustomDrawerButton={goToDashboardButton}
          />
        )
      ) : null}
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
