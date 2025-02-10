import { createContext, useState } from "react";
import {
  AuthContextProps,
  IdentityContextProps,
  IdentityProviderProps,
  SignInProps,
  RegisterUserProps,
} from "./@types";
import { api } from "../../services";
import { useNavigate } from "react-router-dom";

const IdentityContext = createContext({} as IdentityContextProps);
const IdentityProvider = ({ children }: IdentityProviderProps) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const token = localStorage.getItem("@TOKEN");
  const [auth, setAuth] = useState<AuthContextProps | null>(null);
  const navigate = useNavigate();
  const signIn = async (
    data: SignInProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/sign-in", data);
      const token = response.data.accessToken;
      localStorage.setItem("@TOKEN", token);
      setAuth(response.data.accessToken);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };
  const registerUser = async (
    data: RegisterUserProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    try {
      setLoading(true);
      await api.post("/users/register", data);
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <IdentityContext.Provider
      value={{
        token,
        auth,
        setAuth,
        signIn,
        globalLoading,
        setGlobalLoading,
        registerUser,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityProvider };
