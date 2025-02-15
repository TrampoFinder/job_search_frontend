import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.svg";

import { Button } from "../../Button";
export const DefaultHeader = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="w-full flex justify-center h-[81px]">
        <div className="flex items-center justify-between container-apply">
          <img src={logo} alt="Trampo Finder" className="w-[168] h-[28px] cursor-pointer" onClick={() => navigate("/")} />
          <nav className="flex gap-5">
            <button
              className="text-white rounded-md cursor-pointer"
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
          </nav>
        </div>
      </div>
    </header>
  );
};
