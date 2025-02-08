import { createContext, useState } from "react";
import {
  AuthContextProps,
  IdentityContextProps,
  IdentityProviderProps,
} from "./@types";

const IdentityContext = createContext({} as IdentityContextProps);
const IdentityProvider = ({ children }: IdentityProviderProps) => {
  const token = localStorage.getItem("@TOKEN");
  const [auth, setAuth] = useState<AuthContextProps | null>(null);
  return (
    <IdentityContext.Provider value={{ token, auth, setAuth }}>
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityProvider };
