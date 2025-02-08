export interface IdentityProviderProps {
  children: React.ReactNode;
}

export interface IdentityContextProps {
  token: string | null;
  auth: AuthContextProps | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthContextProps | null>>;
}

export interface AuthContextProps {
  accessToken: string;
}
