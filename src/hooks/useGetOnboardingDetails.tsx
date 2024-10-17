import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
} from "../APIs/definitions/user";
import { useEffect, useState } from "react";

const useGetOnboardingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkProcessIsLoading, setCheckProcessIsLoading] =
    useState<boolean>(false);

  //   const { data: studentData, isLoading: studentDataIsLoading } =
  //     useGetUserDetailsQuery();

  const [
    getUserDetails,
    { data: studentData, isLoading: studentDataIsLoading },
  ] = useLazyGetUserDetailsQuery();

  const navigateToCurrentOnboardingStep = async () => {
    const user = await getUserDetails().unwrap();

    if (user?.onboarding_status === "completed") {
      if (location.pathname.includes("pay-tuition-fees"))
        navigate("/pay/payment-details");
      else navigate("/student/dashboard");
    } else {
      navigate("/student/signup");
    }
  };

  const checkCurrentStudentOnboardingState = async () => {
    setCheckProcessIsLoading(true);
    const user = await getUserDetails().unwrap();
    if (studentDataIsLoading) return;

    const token = localStorage.getItem("access-token");
    console.log(token);
    // Check if the user is already logged in or not
    if (!token) navigate("/student/login");

    // Check if the user is a student or not
    const isStudent = localStorage.getItem("studentLogin") === "true";
    console.log(isStudent);
    if (!isStudent) return;

    // Check if the student is fully onboarded
    navigateToCurrentOnboardingStep();
    setCheckProcessIsLoading(false);
  };

  useEffect(() => {
    console.log("loading: ", studentDataIsLoading, studentData);
    checkCurrentStudentOnboardingState();
  }, [studentData, studentDataIsLoading]);

  return {
    navigateToCurrentOnboardingStep,
    checkCurrentStudentOnboardingState,
    checkProcessIsLoading,
  };
};

export default useGetOnboardingDetails;
