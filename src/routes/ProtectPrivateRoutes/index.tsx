import { useContext, useEffect } from "react";
import { IdentityContext } from "../../contexts/IdentityContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const ProtectPrivateRoutes = () => {
  const { token, setAuth, auth } = useContext(IdentityContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setAuth(null);
      navigate("/");
    }
  
  }, [token, setAuth, navigate]);

  return auth ? <Outlet /> : <Navigate to="/" />;
};
