import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { useEffect } from "react";

const BaseRedirect = () => {
  const navigate = useNavigate();
  const studentLogin = localStorage.getItem("studentLogin");
  const tutorLogin = localStorage.getItem("tutorLogin");
  
  useEffect(() => {
    if (studentLogin == "true") {
      navigate("/student/dashboard");
    } else if (tutorLogin == "true") {
      navigate("/tutor/dashboard");
    } else {
      navigate("/pay-tuition-fees");
    }
  }, [studentLogin, tutorLogin]);

  return <Loading />;
};

export default BaseRedirect;
