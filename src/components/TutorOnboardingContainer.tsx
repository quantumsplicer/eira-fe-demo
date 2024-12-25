import { useEffect } from "react";
import { useOnboarding } from "../customHooks/useOnboarding";
import { Loading } from "./Loading";
import { Outlet, useNavigate } from "react-router-dom";

const TutorOnboardingContainer = () => {
  const { determineOnboardingStep, checkProcessIsLoading } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    // if (window.location.pathname.includes("/tutor/complete-kyc")) {
    //   localStorage.setItem("activeFlow", "tutorKyc");
    // }

    const checkOnboardingStatus = async () => {
      const isStudentLogin = localStorage.getItem("studentLogin");
      if (isStudentLogin) {
        localStorage.clear();
        localStorage.setItem("tutorLogin", "true");
        navigate("/tutor/login");
      }

      const { navigateTo, onboardingStep } = await determineOnboardingStep();
      const accessToken = localStorage.getItem("access-token");
      if (accessToken) {
        localStorage.setItem("tutorOnboardingStep", onboardingStep?.toString() ?? "");
        localStorage.setItem("tutorOnboardingNavigation", navigateTo as string);
        switch (window.location.pathname) {
          case "/tutor/login":
            navigate(navigateTo as string);
            break;
          case "/tutor/personal-details":
            if (onboardingStep === 0) navigate(navigateTo as string);
            break;
          case "/tutor/complete-kyc":
            break;
          case "/tutor/dashboard":
            if (onboardingStep !== 0) navigate(navigateTo as string);
            break;
          default:
            break;
        }
      }
    };

    checkOnboardingStatus();
  }, [window.location.pathname]);

  if (checkProcessIsLoading) return <Loading />;

  return <Outlet />;
};

export default TutorOnboardingContainer;
