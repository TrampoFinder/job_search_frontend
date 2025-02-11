import logo from "../../../assets/Logo.svg";

import { Button } from "../../Button";
export const DefaultHeader = () => {
  return (
    <header>
      <div className="w-full flex justify-center h-[81px]">
        <div className="flex items-center justify-between container">
          <img src={logo} alt="Trampo Finder" className="w-[168] h-[28px]" />
          <nav className="flex gap-5">
            <button className="text-white rounded-md cursor-pointer">
              Entrar
            </button>
            <Button
              variant="brand1"
              text="Cadastrar"
              size="small"
              type="button"
              className="p-5 flex items-center cursor-pointer"
            />
          </nav>
        </div>
      </div>
    </header>
  );
};
