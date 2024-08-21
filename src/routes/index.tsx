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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/verify" element={<InputPhone />} />
      <Route path="/payment-details" element={<InputPaymentDetails />} />
      <Route path="/create-session" element={<SlotBookingPage />} />
      <Route path="/review" element={<PaymentReviewPage />} />
      <Route path="/payment-gateway-payment-flow" element={<PGLoading />} />
      <Route
        path="/payment-successful"
        element={<PaymentSuccessfulPage />}
      />
      <Route path="/tutor-id/dashboard" element={<TutorDashboard/>}/>
    </Routes>
  );
};

export default AppRoutes;
