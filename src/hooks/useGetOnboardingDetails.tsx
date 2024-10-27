import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useLazyGetUserByUserNameQuery,
  useLazyGetUserDetailsQuery,
} from "../APIs/definitions/user";
import { useEffect, useState } from "react";
import { useLazyGetPaymentInfoFromLinkQuery } from "../APIs/definitions/paymentLinks";

const useGetOnboardingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkProcessIsLoading, setCheckProcessIsLoading] =
    useState<boolean>(true);

  //   const { data: studentData, isLoading: studentDataIsLoading } =
  //     useGetUserDetailsQuery();

  const [
    getUserDetails,
    { data: studentData, isLoading: studentDataIsLoading },
  ] = useLazyGetUserDetailsQuery();

  const [
    getTutorDetials
  ] = useLazyGetUserByUserNameQuery();

  const [getPaymentLinkInfo] = useLazyGetPaymentInfoFromLinkQuery();

  const navigateToCurrentOnboardingStep = async () => {
    const user = await getUserDetails().unwrap().catch(err => console.log(err));

    const activePaymentFlow = localStorage.getItem("activeFlow");

    if (user?.pan && user?.phone && user?.first_name) {
      switch (activePaymentFlow) {
        case "payTuitionFeesFlow":
          navigate("/pay/payment-details");
          break;
        case "StaticLinkFlow":
          const tutorUsername = localStorage.getItem("activeFlowUrl")?.split("/").pop();
          if (tutorUsername) {
            await getTutorDetials(tutorUsername)
            .unwrap()
            .then(res => {
              const tutor = res[0]
              localStorage.setItem(
                "activePaymentTutorId",
                tutor?.phone
              )
              localStorage.setItem(
                "activePaymentTutorName",
                `${tutor?.first_name} ${tutor?.last_name}`
              )
              localStorage.setItem(
                "activePaymentPayeeUserId",
                tutor?.id
              )
              navigate(`/static-link/${tutorUsername}`)
            })
            .catch(err => console.log(err))
          }
          break;
        case "DynamicLinkFlow":
          try {
            const activeFlowUrl = localStorage.getItem("activeFlowUrl");
            const paymentLinkInfo = await getPaymentLinkInfo(
              activeFlowUrl?.split("/").at(-1) as string
            ).unwrap();

            localStorage.setItem(
              "activePaymentAmount",
              `${paymentLinkInfo?.amount}`
            );
            localStorage.setItem(
              "activePaymentTutorId",
              paymentLinkInfo?.payee_phone
            );
            localStorage.setItem(
              "activePaymentTutorName",
              paymentLinkInfo?.payee_name
            )
            localStorage.setItem(
              "activePaymentPayeeUserId",
              paymentLinkInfo?.payee
            )

            navigate("/pay/review");
          } catch {
            navigate("/page-not-found");
            console.error("Error fetching payment link info");
          }
          break;
        default:
          navigate("/student/dashboard");
          break;
      }
    } else {
      if (localStorage.getItem("studentLogin") === "true") {
        navigate("/student/signup");
      } else {
        navigate("/student/login");
      }
    }
  };

  const checkCurrentStudentOnboardingState = async () => {
    setCheckProcessIsLoading(true);
    try {
      await getUserDetails().unwrap();
      console.log("jgjhvv");
      if (studentDataIsLoading) return;

      const token = localStorage.getItem("access-token");
      console.log(token);
      // Check if the user is already logged in or not
      if (!token) navigate("/student/login");

      // Check if the user is a student or not
      const isStudent = localStorage.getItem("studentLogin") === "true";
      console.log(isStudent);
      if (!isStudent) {
        setCheckProcessIsLoading(false);
        return;
      }
    } catch {}

    // Check if the student is fully onboarded
    navigateToCurrentOnboardingStep();
    setCheckProcessIsLoading(false);
  };

  useEffect(() => {
    console.log("loading: ", studentDataIsLoading, studentData);
    setCheckProcessIsLoading(true);
    checkCurrentStudentOnboardingState();
  }, [studentData, studentDataIsLoading]);

  return {
    navigateToCurrentOnboardingStep,
    checkCurrentStudentOnboardingState,
    checkProcessIsLoading,
  };
};

export default useGetOnboardingDetails;
