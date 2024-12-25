import { useLocation, useNavigate } from "react-router-dom";
import {
  UserDetails,
  useLazyGetUserByUserNameQuery,
  useLazyGetUserDetailsByIdQuery,
  useLazyGetUserDetailsQuery,
  usePrefillOnboardingMutation,
} from "../APIs/definitions/user";
import { useEffect, useState } from "react";
import { useLazyGetPaymentInfoFromLinkQuery } from "../APIs/definitions/paymentLinks";

const useGetOnboardingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkProcessIsLoading, setCheckProcessIsLoading] =
    useState<boolean>(false);

  const [triggerPrefillOnboarding] = usePrefillOnboardingMutation();

  const [
    getUserDetails,
    { data: studentData, isLoading: studentDataIsLoading },
  ] = useLazyGetUserDetailsQuery();

  const [getTutorDetails] = useLazyGetUserByUserNameQuery();

  const [getTutorDetailsById] = useLazyGetUserDetailsByIdQuery();

  const [getPaymentLinkInfo] = useLazyGetPaymentInfoFromLinkQuery();

  const navigationLogic = async (user: UserDetails) => {
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
            const tutorUsername =
              urlStrings[urlStrings.length - 1] !== ""
                ? urlStrings[urlStrings.length - 1]
                : urlStrings[urlStrings.length - 2];
            await getTutorDetails(tutorUsername)
              .unwrap()
              .then((res) => {
                const tutor = res[0];
                localStorage.setItem("activePaymentTutorId", tutor?.phone);
                localStorage.setItem(
                  "activePaymentTutorName",
                  `${tutor?.first_name} ${tutor?.last_name}`
                );
                localStorage.setItem("activePaymentPayeeUserId", tutor?.id);
                navigate(`/static-link/${tutorUsername}`);
              })
              .catch((err) => console.log(err));
          }
          break;
        case "DynamicLinkFlow":
          localStorage.setItem("isTutorEiraOnboarded", "true");
          try {
            const activeFlowQuery = localStorage.getItem("activeFlowQuery");
            const activePaymentLinkId = activeFlowQuery
              ?.split("=")
              .at(-1) as string;
            const paymentLinkInfo = await getPaymentLinkInfo(
              activePaymentLinkId
            )
              .unwrap()
              .then()
              .catch();

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
            );
            localStorage.setItem(
              "activePaymentPayeeUserId",
              paymentLinkInfo?.payee
            );
            activePaymentLinkId &&
              localStorage.setItem("activePaymentLinkId", activePaymentLinkId);

            if (paymentLinkInfo?.payee) {
              let isTutorPgOnboarded = false;
              getTutorDetailsById(paymentLinkInfo.payee)
                .unwrap()
                .then((res) => {
                  isTutorPgOnboarded =
                    res?.pg_onboarding_status.length > 0 &&
                    (res.pg_onboarding_status[0].status ===
                      "MIN_KYC_APPROVED" ||
                      res.pg_onboarding_status[0].status === "ACTIVE");
                })
                .catch()
                .finally(
                  () =>
                    isTutorPgOnboarded
                      ? navigate("/pay/review")
                      : navigate("/page-not-found")
                  // isTutorPgOnboarded ? navigate("/pay/review") : navigate("/pay/create-session")
                );
            } else {
              navigate("/page-not-found");
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
      if (
        localStorage.getItem("access-token") &&
        localStorage.getItem("studentLogin") === "true"
      ) {
        setCheckProcessIsLoading(true);
        await triggerPrefillOnboarding({
          phone: user?.phone,
        }).then(async (result) => {
          if (result) {
            localStorage.setItem("autoFillDetails", "true");

            const firstName = result.data?.first_name;
            const lastName = result.data?.last_name;
            const pan = result.data?.pan;

            firstName && localStorage.setItem("firstName", firstName);
            lastName && localStorage.setItem("lastName", lastName);
            pan && localStorage.setItem("pan", pan);

            firstName && lastName && pan && navigateToCurrentOnboardingStep(); // if prefill gives all only navigate then otherwise this goes into an endless loop
          }
        });
        navigate("/student/signup");
      } else {
        navigate("/student/login");
      }
    }
  };

  const navigateToCurrentOnboardingStep = async () => {
    const user = await getUserDetails()
      .unwrap()
      .catch((err) => console.log(err));

    await navigationLogic(user as UserDetails);
  };

  const checkCurrentStudentOnboardingState = async () => {
    setCheckProcessIsLoading(true);
    try {
      const user = await getUserDetails().unwrap();

      const token = localStorage.getItem("access-token");

      // Check if the user is already logged in or not
      if (!token && !window.location.href.includes("student/login"))
        navigate("/student/login");

      // Check if the user is a student or not
      const isStudent = localStorage.getItem("studentLogin") === "true";

      if (!isStudent) {
        setCheckProcessIsLoading(false);
        return;
      }

      // Check if the student is fully onboarded
      navigationLogic(user as UserDetails);
      setCheckProcessIsLoading(false);
    } catch {
      setCheckProcessIsLoading(false);
      console.error("Error fetching user details");
    }
  };

  return {
    navigateToCurrentOnboardingStep,
    checkCurrentStudentOnboardingState,
    checkProcessIsLoading,
  };
};

export default useGetOnboardingDetails;
