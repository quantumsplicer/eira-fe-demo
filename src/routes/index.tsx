import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InputPhone from "../flows/payTutionFees/pages/InputPhone";
import InputPaymentDetails from "../flows/payTutionFees/pages/InputPaymentDetails";
import PaymentReviewPage from "../flows/payTutionFees/pages/PaymentReviewPage";
import PGLoading from "../flows/payTutionFees/pages/PGLoading";
import PaymentSuccessfulPage from "../flows/payTutionFees/pages/PaymentSuccessfulPage";
import SlotBookingPage from "../flows/payTutionFees/pages/SlotBookingPage";
import TutorDashboard from "../flows/tutorDashboard/pages/TutorDashboard";
import StudentDashboard from "../flows/studentDashboard/pages/StudentDashboard";
import TutorSignIn from "../flows/tutorOnboarding/pages/TutorSignIn";
import TutorSignUp from "../flows/tutorOnboarding/pages/TutorSignUp";
import AadharVerification from "../flows/tutorOnboarding/pages/AadharVerification";
import InputPersonalDetails from "../flows/payTutionFees/pages/InputPersonalDetails";
import InputTutorDetails from "../flows/payTutionFees/pages/InputTutorDetails";
import StudentSignIn from "../flows/studentOnboarding/pages/StudentSignIn";
import StudentSignUp from "../flows/studentOnboarding/pages/StudentSignUp";
import InputPayment from "../flows/staticLink/pages/InputPayment";
import PayFeesContainer from "../flows/payTutionFees/pages/PayFeesContainer";
import KycLogin from "../flows/kyc/pages/KycLogin";
import AadharVerifyRedirectPage from "../flows/tutorOnboarding/pages/AadharVerifyRedirectPage";
import { PageNotFound } from "../components/PageNotFound";
import PaymentRedirect from "../flows/payTutionFees/pages/PaymentRedirect";
import TutorWebsite from "../flows/tutorWebsite/pages/tutorWebsite";
import TutorTermsOfUse from "../flows/tutorWebsite/pages/TutorTerms";
import RefundPolicy from "../flows/tutorWebsite/pages/RefundPolicy";
import ContactPolicy from "../flows/tutorWebsite/pages/ContactPolicy";
import TutorOnboardingContainer from "../components/TutorOnboardingContainer";
import BaseRedirect from "../components/BaseRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pay/personal-details" element={<InputPersonalDetails />} />
      <Route path="/pay/payment-details" element={<InputPaymentDetails />} />
      <Route path="/pay/tutor-details" element={<InputTutorDetails />} />
      <Route path="/pay/create-session" element={<SlotBookingPage />} />
      <Route path="/pay/review" element={<PaymentReviewPage />} />
      <Route path="/pay/payment-gateway-payment-flow" element={<PGLoading />} />
      <Route path="/pay/redirect" element={<PaymentRedirect />} />
      <Route path="/pay/status" element={<PaymentSuccessfulPage />} />
      
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      <Route path="tutor/aadhar-verification" element={<AadharVerification />} />
      <Route path="tutor/onboarding/aadhar-redirect" element={<AadharVerifyRedirectPage />} />

      {/**
       * Pay Tuition Fees route
       */}
      <Route path="pay-tuition-fees/" element={<PayFeesContainer />}>
        <Route path="" element={<StudentSignIn />} />
        <Route path="login" element={<StudentSignIn />} />
        <Route path="pay/verify" element={<InputPhone />} />
      </Route>

      {/**
       * Dynamic Payment link route
       */}
      <Route path="payment-link/" element={<PayFeesContainer />}>
        <Route path=":link-id" element={<StudentSignIn />} />
      </Route>

      {/**
       * Static Payment link route
       */}
      <Route path="static-link/" element={<PayFeesContainer />}>
        <Route path=":tutor-username" element={<InputPayment />} />
      </Route>
      <Route path="student/login" element={<StudentSignIn />} />
      <Route path="student/signup" element={<StudentSignUp />} />
      <Route path="tutor/kyc" element={<KycLogin />} />

      <Route path="tutor/" element={<TutorOnboardingContainer />}>
        <Route path="login" element={<TutorSignIn />} />
        <Route path="personal-details" element={<TutorSignUp />} />
        <Route path="kyc" element={<KycLogin />} />
        <Route path="dashboard" element={<TutorDashboard />} />
      </Route>

      <Route path="" element={<BaseRedirect />} />
      <Route path="page-not-found" element={<PageNotFound />} />
      <Route path="/:tutorUserName" element={<TutorWebsite />} />
      <Route
        path="/:tutorUserName/terms-of-use"
        element={<TutorTermsOfUse />}
      />
      <Route path="/:tutorUserName/refund-policy" element={<RefundPolicy />} />
      <Route
        path="/:tutorUserName/contact-policy"
        element={<ContactPolicy />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
