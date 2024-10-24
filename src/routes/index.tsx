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
      
      <Route path="/tutor/dashboard" element={<TutorDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      <Route path="tutor/login" element={<TutorSignIn />} />
      <Route path="tutor/personal-details" element={<TutorSignUp />} />
      <Route path="tutor/aadhar-verification" element={<AadharVerification />} />
      <Route path="tutor/onboarding/aadhar-redirect" element={<AadharVerifyRedirectPage />} />
      <Route path="tutor/dashboard" element={<TutorDashboard />} />

      <Route path="student/" element={<PayFeesContainer/>}>
        <Route path="login" element={<StudentSignIn />} />
      </Route>

      {/**
       * Pay Tuition Fees route
       */}
      <Route path="pay-tuition-fees/" element={<PayFeesContainer/>}>
        <Route path="login" element={<StudentSignIn />} />
        <Route path="pay/verify" element={<InputPhone />} />
      </Route>

      {/** 
       * Dynamic Payment link route
      */}
      <Route path="payment-link/" element={<PayFeesContainer/>}>
        <Route path=":link-id" element={<StudentSignIn />} />
      </Route>

      {/** 
       * Static Payment link route
      */}
      <Route path="static-link/" element={<PayFeesContainer/>}>
        <Route path=":tutor-username" element={<InputPayment />} />
      </Route>


      <Route path="student/signup" element={<StudentSignUp />} />

      <Route path="tutor/kyc/login" element={<KycLogin />} />

      <Route path="*" element={<PageNotFound />} />
      <Route path="page-not-found" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
