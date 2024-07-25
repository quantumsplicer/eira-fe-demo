import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InputPhone from "../flows/payTutionFees/pages/InputPhone";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/pay/verify" element={<InputPhone />} />
    </Routes>
  );
};

export default AppRoutes;
