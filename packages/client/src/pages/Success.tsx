import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Success: React.FC = () => {
  const { login, token } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      login(tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [login]);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Success;
