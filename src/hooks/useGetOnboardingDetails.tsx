import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useLazyGetUserByUserNameQuery,
  useLazyGetUserDetailsQuery,
  useLazyUserSearchByIdQuery,
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
    getTutorDetails
  ] = useLazyGetUserByUserNameQuery();

  const [
    getTutorDetailsById
  ] = useLazyUserSearchByIdQuery();

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
          localStorage.setItem("isTutorEiraOnboarded", "true");
          const urlStrings = localStorage.getItem("activeFlowUrl")?.split("/");
          if (urlStrings) {
            const tutorUsername = urlStrings[urlStrings.length-1] !== "" ? urlStrings[urlStrings.length-1] : urlStrings[urlStrings.length-2]
            await getTutorDetails(tutorUsername)
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
          localStorage.setItem("isTutorEiraOnboarded", "true");
          try {
            const activeFlowQuery = localStorage.getItem("activeFlowQuery");
            const paymentLinkInfo = await getPaymentLinkInfo(
              activeFlowQuery?.split("=").at(-1) as string
            ).unwrap().then().catch();

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

            if (paymentLinkInfo?.payee) {
              let isTutorPgOnboarded = false;
              getTutorDetailsById(paymentLinkInfo.payee)
                .unwrap()
                .then(res => {
                  isTutorPgOnboarded = res?.pg_onboarding_status.length > 0 &&
                    (res.pg_onboarding_status[0].status === "MIN_KYC_APPROVED" || res.pg_onboarding_status[0].status === "ACTIVE");
                })
                .catch()
                .finally(() => 
                  isTutorPgOnboarded ? navigate("/pay/review") : navigate("/page-not-found")
                  // isTutorPgOnboarded ? navigate("/pay/review") : navigate("/pay/create-session")
                )
            } else {
              navigate("/page-not-found")
            }
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
      if (studentDataIsLoading) return;

      const token = localStorage.getItem("access-token");

      // Check if the user is already logged in or not
      if (!token) navigate("/student/login");

      // Check if the user is a student or not
      const isStudent = localStorage.getItem("studentLogin") === "true";

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
    if (studentDataIsLoading) return;

    console.log("loading: ", studentDataIsLoading, studentData);
    setCheckProcessIsLoading(true);
    checkCurrentStudentOnboardingState();
  }, [studentData, studentDataIsLoading])

  return {
    navigateToCurrentOnboardingStep,
    checkCurrentStudentOnboardingState,
    checkProcessIsLoading,
  };
};

export default useGetOnboardingDetails;
