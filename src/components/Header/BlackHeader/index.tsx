import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.svg";

import { Button } from "../../Button";
import { useContext } from "react";
import { IdentityContext } from "../../../contexts/IdentityContext";
export const BlackHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile/user";
  const { user } = useContext(IdentityContext);
  return (
    <header>
      <div className="w-full flex justify-center h-[81px] bg-black-20">
        <div className="flex items-center justify-between container">
          <img
            src={logo}
            alt="Trampo Finder"
            className="w-[168] h-[28px] cursor-pointer"
            onClick={() => navigate("/")}
          />
          <nav>
            <ul className="flex justify-center items-center w-full max-w-[527px] h-[27px] gap-5">
              <li className="cursor-pointer flex flex-col relative w-[45px] items-center">
                <span className="text-white font-semibold">Início</span>
                <div className="bg-brand-2 h-1 w-full absolute rounded-br-1 rounded-bl-1 top-6" />
              </li>

              <li className="text-white opacity-50 cursor-pointer">
                {isProfilePage ? "Minhas candidaturas" : "Vagas"}
              </li>
              <li className="text-white opacity-50 cursor-pointer">
                Sobre nós
              </li>
              <li className="text-white opacity-50 cursor-pointer">Contato</li>
            </ul>
          </nav>
          <nav
            className={`flex gap-5 ${
              isProfilePage ? "items-center justify-center" : ""
            }`}
          >
            {isProfilePage ? (
              <>
                <div className="text-white rounded-full bg-white/10 w-[46px] h-[46px] flex items-center justify-center custom-shadow-40">
                  <span className="font-semibold">
                    {user && user.firstName && user.lastName ? (
                      <span className="font-semibold">
                        {user.firstName.charAt(0) + user.lastName.charAt(0).toLocaleUpperCase()}
                      </span>
                    ) : null}
                  </span>
                </div>
                <span className="text-[20px] font-bold leading-0 text-white">
                  {user?.firstName}
                </span>
              </>
            ) : (
              <>
                <button
                  className="text-white rounded-full  cursor-pointer"
                  onClick={() => navigate("/sign-in")}
                >
                  Entrar
                </button>
                <Button
                  variant="brand1"
                  text="Cadastrar"
                  size="small"
                  type="button"
                  className="p-5 flex items-center cursor-pointer"
                  onClick={() => navigate("/register")}
                />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
