import React, { useState, useEffect } from "react";
import SessionLinkDialog from "../../dialogs/SessionLinkDialog";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import {
  useCreateSessionMutation,
  useGetSessionListQuery,
} from "../../../../APIs/definitions/session";
import { SessionDetails } from "../../../../APIs/definitions/session";
import { useRegisterStudentByTutorMutation } from "../../../../APIs/definitions/user";

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
  const [registerStudent, { isLoading: registerStudentIsLoading }] =
    useRegisterStudentByTutorMutation();
  const [openSessionLinkDialog, setOpenSessionLinkDialog] =
    useState<boolean>(true);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);

  const handleOnSuccessSessionLinkDialog = () => {};

  const handleOnFailureSessionLinkDialog = () => {};

  const handleOnCloseSessionLinkDialog = () => {
    setOpenSessionLinkDialog(true);
    setOpenConfirmationDialog(false);
    onClose();
  };

  const handleOnSubmitSessionLinkDialog = async (data: any) => {
    const { attendeePhoneNumber, ...sessionData } = data;

    registerStudent({
      phone: attendeePhoneNumber,
    })
      .unwrap()
      .then((res) => {
        if (res) {
          const userId = res.id;
          createSessionLink({
            subject: "",
            teacher_id: localStorage.getItem("userId") || "",
            student_id: userId,
            amount: 0,
            starttime: sessionData.selectedDate,
            endtime: sessionData.selectedDate,
            title: sessionData.sessionTitle,
          })
            .unwrap()
            .then((sessionRes) => {
              setOpenSessionLinkDialog(false);
              setOpenConfirmationDialog(true);
            });
        }
      });
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenSessionLinkDialog(true);
    onClose();
  };

  useEffect(() => {
    console.log("session link flow");
  }, []);

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
        heading={isSuccess ? "Session Link Created" : "Error"}
        subHeading={
          isSuccess
            ? "Your session link has been successfully created and sent to the student(s)."
            : "Something went wrong"
        }
      />
    </>
  );
};

export default SendSessionLinkFlow;
