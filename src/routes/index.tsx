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
import TutorSignIn from "../flows/tutorOnboarding/pages/TutorSignIn";
import TutorSignUp from "../flows/tutorOnboarding/pages/TutorSignUp";
import AadharVerification from "../flows/tutorOnboarding/pages/AadharVerification";
import TutorDashboard from "../flows/tutorOnboarding/pages/TutorDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pay/verify" element={<InputPhone />} />
      <Route path="/pay/payment-details" element={<InputPaymentDetails />} />
      <Route path="/pay/create-session" element={<SlotBookingPage />} />
      <Route path="/pay/review" element={<PaymentReviewPage />} />
      <Route path="/pay/payment-gateway-payment-flow" element={<PGLoading />} />
      <Route
        path="/pay/payment-successful"
        element={<PaymentSuccessfulPage />}
      />
      <Route path="tutor/signin" element={<TutorSignIn />}></Route>
      <Route path="tutor/signup" element={<TutorSignUp />}></Route>
      <Route path="tutor/aadhar-verification" element={<AadharVerification />}></Route>
      <Route path="tutor/dashboard" element={<TutorDashboard />}></Route>
    </Routes>
  );
};

export default AppRoutes;
