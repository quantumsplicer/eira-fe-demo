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
import TutorDashboard from "../flows/tutorOnboarding/pages/TutorDashboard";
import InputPersonalDetails from "../flows/payTutionFees/pages/InputPersonalDetails";
import InputTutorDetails from "../flows/payTutionFees/pages/InputTutorDetails";
import StudentSignIn from "../flows/studentOnboarding/pages/StudentSignIn";
import StudentSignUp from "../flows/studentOnboarding/pages/StudentSignUp";
import InputPayment from "../flows/staticLink/pages/InputPayment";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pay/verify" element={<InputPhone />} />
      <Route path="/pay/personal-details" element={<InputPersonalDetails />} />
      <Route path="/pay/payment-details" element={<InputPaymentDetails />} />
      <Route path="/pay/tutor-details" element={<InputTutorDetails />} />
      <Route path="/pay/create-session" element={<SlotBookingPage />} />
      <Route path="/pay/review" element={<PaymentReviewPage />} />
      <Route path="/pay/payment-gateway-payment-flow" element={<PGLoading />} />
      <Route
        path="/payment-successful"
        element={<PaymentSuccessfulPage />}
      />
      <Route path="/tutor-id/dashboard" element={<TutorDashboard />} />
      <Route path="/student-id/dashboard" element={<StudentDashboard />} />

      <Route path="tutor/signin" element={<TutorSignIn />} />
      <Route path="tutor/signup" element={<TutorSignUp />} />
      <Route path="tutor/aadhar-verification" element={<AadharVerification />} />
      <Route path="tutor/dashboard" element={<TutorDashboard />} />

      <Route path="student/signin" element={<StudentSignIn />} />
      <Route path="student/signup" element={<StudentSignUp />} />
      <Route path="pay/static/:phoneNumber" element={<InputPayment />} />
      <Route path="pay/dynamic/:amount/:phoneNumber" element={<PaymentReviewPage />} />
    </Routes>
  );
};

export default AppRoutes;
