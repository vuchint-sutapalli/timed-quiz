import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../Atoms";

const Protected = ({ children, authentication = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useRecoilValue(authState)?.status;
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      if (authStatus === undefined || authStatus === null) {
        // Keep loading if authStatus is still being determined
        return;
      }
      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus === authentication) {
        // If not authenticated and the page requires authentication
        navigate("/");
      } else {
        setIsLoading(false); // No redirection needed, hide the loader
      }
    };

    checkAuthStatus();
  }, [authStatus, authentication, navigate]);

  return isLoading ? <div>Loading...</div> : <>{children}</>;
};

export default Protected;
