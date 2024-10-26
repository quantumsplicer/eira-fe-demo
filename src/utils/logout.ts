import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove all data from local storage
    const studentLogin = localStorage.getItem("studentLogin");
    localStorage.clear();
    if (studentLogin === "true") {
      navigate("/student/login");
    } else {
      navigate("/tutor/login");
    }
  };

  return logout;
};
