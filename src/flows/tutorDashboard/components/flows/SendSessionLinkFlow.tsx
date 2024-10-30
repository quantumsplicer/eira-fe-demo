import React, { useState, useEffect } from "react";
import SessionLinkDialog from "../../dialogs/SessionLinkDialog";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import {
  useCreateSessionMutation,
  useGetSessionListQuery,
} from "../../../../APIs/definitions/session";
import { SessionDetails } from "../../../../APIs/definitions/session";

interface SendSessionLinkFlowProps {
  isActive: boolean;
  onClose: () => void;
}

const SendSessionLinkFlow: React.FC<SendSessionLinkFlowProps> = ({
  isActive,
  onClose,
}) => {
  const [createSessionLink, { isLoading, isSuccess, isError, error }] =
    useCreateSessionMutation();

  const [openSessionLinkDialog, setOpenSessionLinkDialog] =
    useState<boolean>(true);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();
  const handleOnSuccessSessionLinkDialog = () => {};

  const handleOnFailureSessionLinkDialog = () => {};

  const handleOnCloseSessionLinkDialog = () => {
    setOpenSessionLinkDialog(true);
    setOpenConfirmationDialog(false);
    onClose();
  };

  const handleOnSubmitSessionLinkDialog = (data: any) => {
    createSessionLink({
      student_id: data.attendees[0],
      starttime: data.startTime,
      endtime: data.endTime,
      title: data.sessionTitle,
      subject: "blank_subject",
      teacher_id: localStorage.getItem("userId") || "",
      amount: 0,
    })
      .unwrap()
      .then((response) => {
        console.log("Session link created:", response);
        setOpenConfirmationDialog(true);
      })
      .catch((err) => {
        console.error("Error creating session link:", err);
      });

    setOpenSessionLinkDialog(false);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenSessionLinkDialog(true);
    onClose();
  };

  useEffect(() => {
    setOpenSessionLinkDialog(isActive);
  }, [isActive]);

  return (
    <>
      <SessionLinkDialog
        open={openSessionLinkDialog && isActive}
        onSuccess={handleOnSuccessSessionLinkDialog}
        onFailure={handleOnFailureSessionLinkDialog}
        onClose={handleOnCloseSessionLinkDialog}
        onSubmit={handleOnSubmitSessionLinkDialog}
      />
      <ConfirmationDialog
        open={openConfirmationDialog && isActive}
        onClose={handleOnCloseConfirmationDialog}
        heading="Session Link Created"
        subHeading="Your session link has been successfully created and sent to the student(s)."
      />
    </>
  );
};

export default SendSessionLinkFlow;
