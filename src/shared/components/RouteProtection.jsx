import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function RouteProtection({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default RouteProtection;
