import React from "react";
import { IdentityProvider } from "./IdentityContext";
import { ProviderProps } from "./@types";

export const Providers = ({ children }: ProviderProps) => {
  return (
    <React.Fragment>
      <IdentityProvider>{children}</IdentityProvider>
    </React.Fragment>
  );
};
