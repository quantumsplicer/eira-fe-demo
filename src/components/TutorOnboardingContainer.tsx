import { useEffect } from "react";
import { useOnboarding } from "../customHooks/useOnboarding"
import { Loading } from "./Loading";
import { Outlet, useNavigate } from "react-router-dom";

const TutorOnboardingContainer = () => {
    const { determineOnboardingStep, checkProcessIsLoading } = useOnboarding();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname.includes("/tutor/kyc")) {
            localStorage.setItem("activeFlow", "tutorKyc");
        }

        const checkOnboardingStatus = async () => {
            const { navigateTo, onboardingStep } = await determineOnboardingStep();
            const accessToken = localStorage.getItem("access-token");
            if (accessToken) {
                localStorage.setItem("tutorOnboardingStep", onboardingStep.toString());
                localStorage.setItem("tutorOnboardingNavigation", navigateTo);
                switch (window.location.pathname) {
                    case "/tutor/login":
                        navigate(navigateTo);
                        break;
                    case "/tutor/personal-details":
                        if (onboardingStep === 0) navigate(navigateTo);
                        break;
                    case "/tutor/kyc":
                        break;
                    case "/tutor/dashboard":
                        if (onboardingStep !== 0 && onboardingStep !== 3) navigate(navigateTo);
                        break;
                    default:
                        break;
                }
            }
        }
        
        checkOnboardingStatus();
    }, [])

    if (checkProcessIsLoading) return <Loading />;

    return <Outlet />;
}

export default TutorOnboardingContainer;