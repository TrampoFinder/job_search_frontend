import { createContext, useEffect, useState } from "react";
import {
  AuthContextProps,
  IdentityContextProps,
  IdentityProviderProps,
  SignInProps,
  RegisterUserProps,
  UserContextProps,
  UpdateUserProps,
} from "./@types";
import { api } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const IdentityContext = createContext({} as IdentityContextProps);
const IdentityProvider = ({ children }: IdentityProviderProps) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const token = localStorage.getItem("@TOKEN");
  const [auth, setAuth] = useState<AuthContextProps | null>(null);
  const [user, setUser] = useState<UserContextProps | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (!token) {
        return;
      }
      try {
        setGlobalLoading(true);
        const { sub }: never = jwtDecode(token);
        const response = await api.get(`users/${sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data);
          if (response.data.role === "ADMIN") {
            navigate("/profile/admin");
          } else {
            navigate("/profile/users");
          }
          setAuth({ accessToken: token });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        localStorage.clear();
        setUser(null);
      } finally {
        setGlobalLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const signIn = async (
    data: SignInProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await toast.promise(api.post("/auth/sign-in", data), {
        pending: {
          render() {
            return "Carregando...";
          },
          theme: "dark",
        },
        success: {
          render() {
            return `Seja bem-vinde a nossa dashboard`;
          },
          theme: "dark",
        },
        error: {
          render() {
            return "Não foi possível fazer sign-in";
          },
          theme: "dark",
        },
      });
      if (response.status === 200) {
        const token = response.data.accessToken;
        localStorage.setItem("@TOKEN", token);
        setAuth(token);
        await navigate("/profile/users");
      }
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
      const response = await toast.promise(api.post("/users/register", data), {
        pending: {
          render() {
            return "Carregando...";
          },
          theme: "dark",
        },
        error: {
          render() {
            return "Não foi possível cadastrar";
          },
          theme: "dark",
        },
      });
      if (response.status === 201) {
        await navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updateUser = async (
    data: UpdateUserProps,
    userId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.patch(`/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        localStorage.removeItem("@TOKEN");
        setUser(null);
        return;
      }
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
        user,
        setUser,
        isDropdownOpen,
        setIsDropdownOpen,
        updateUser,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityProvider };
