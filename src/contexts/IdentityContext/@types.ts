export interface IdentityProviderProps {
  children: React.ReactNode;
}

export interface IdentityContextProps {
  token: string | null;
  auth: AuthContextProps | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthContextProps | null>>;
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (
    signInData: SignInProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  registerUser: (
    data: RegisterUserProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  user: UserContextProps | null;
}

export interface UserContextProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  delatedAt: string;
}

export interface AuthContextProps {
  accessToken: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface RegisterUserProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
