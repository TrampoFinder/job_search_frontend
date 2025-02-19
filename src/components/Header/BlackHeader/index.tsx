import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.svg";

import { DefaultButton } from "../../Buttons/DefaultButton";
import { useContext } from "react";
import { IdentityContext } from "../../../contexts/IdentityContext";
import { JobManagementContext } from "../../../contexts/JobContext";
export const BlackHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(IdentityContext);
  const { focusIndex, setFocusIndex } = useContext(JobManagementContext);
  const isProfilePage =
    location.pathname === "/profile/users" ||
    location.pathname === `/profile/users/${user?.id}`;

  const handleFocus = (index: number) => {
    setFocusIndex(index);
  };
  return (
    <header>
      <div className="w-full flex justify-center h-[81px] bg-black-20">
        <div className="flex items-center justify-between container-apply">
          <img
            src={logo}
            alt="Trampo Finder"
            className="w-[168] h-[28px] cursor-pointer"
            onClick={() => navigate("/")}
          />
          <nav>
            <ul className="flex justify-center items-center w-full max-w-[527px] h-[27px] gap-5">
              <li
                className="cursor-pointer flex flex-col relative w-[45px] items-center"
                onClick={() => {
                  if (isProfilePage) {
                    navigate("/profile/users");
                    handleFocus(0);
                  }
                }}
              >
                <span
                  className={`text-white font-semibold ${
                    focusIndex === 0 ? "" : "opacity-50"
                  }`}
                >
                  Início
                </span>
                {focusIndex === 0 && (
                  <div className="bg-brand-2 h-1 w-full absolute rounded-br-1 rounded-bl-1 top-6" />
                )}
              </li>
              <li
                className="cursor-pointer flex flex-col relative items-center"
                onClick={() => {
                  handleFocus(1);
                  if (isProfilePage) {
                    navigate(`/profile/users/${user?.id}`);
                    handleFocus(0);
                  } else {
                    navigate("/");
                    handleFocus(0);
                  }
                }}
              >
                <span
                  className={`text-white font-semibold ${
                    focusIndex === 1 ? "" : "opacity-50"
                  }`}
                >
                  {isProfilePage ? "Minhas candidaturas" : "Vagas"}
                </span>
                {focusIndex === 1 && (
                  <div className="bg-brand-2 h-1 w-full absolute rounded-br-1 rounded-bl-1 top-6" />
                )}
              </li>

              {/* <li className="text-white opacity-50 cursor-pointer">
                Sobre nós
              </li>
              <li className="text-white opacity-50 cursor-pointer">Contato</li> */}
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
                        {user.firstName.charAt(0) +
                          user.lastName.charAt(0).toLocaleUpperCase()}
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
                <DefaultButton
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
