import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.svg";

import { DefaultButton } from "../../Buttons/DefaultButton";
import { useContext } from "react";
import { IdentityContext } from "../../../contexts/IdentityContext";
import { JobManagementContext } from "../../../contexts/JobContext";
import { DropdownUser } from "../Dropdown/intex";
import './style.css';
export const BlackHeader = () => {
  const navigate = useNavigate();

  const { user } = useContext(IdentityContext);
  const { focusIndex, setFocusIndex } = useContext(JobManagementContext);

  const handleFocus = (index: number) => {
    setFocusIndex(index);
    console.log(focusIndex);
  };
  return (
    <header>
      <div className="w-full flex justify-center h-[81px] bg-black-20">
        <div className="flex items-center justify-between container-apply">
          <img id="logo"
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
                  if (user && user.role === "USER") {
                    navigate("/profile/users");
                    handleFocus(0);
                  }
                  if (user && user.role === "ADMIN") {
                    navigate("/profile/admin");
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
                  if (user?.role === "USER") {
                    navigate(`/profile/users/${user?.id}`);
                    handleFocus(1);
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
                  {user && user.role === "USER"
                    ? "Minhas candidaturas"
                    : "Vagas"}
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
          <nav>
            {user ? (
              <DropdownUser
                initials={
                  user.firstName.charAt(0) +
                  user.lastName.charAt(0).toLocaleUpperCase()
                }
                firstName={user.firstName}
              />
            ) : (
              <div className="flex gap-5">
                <button id="entrar"
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
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
