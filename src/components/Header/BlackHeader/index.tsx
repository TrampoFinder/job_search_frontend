import logo from "../../../assets/Logo.svg";

import { Button } from "../../Button";
export const BlackHeader = () => {
  return (
    <header>
      <div className="w-full flex justify-center h-[81px] bg-black-20">
        <div className="flex items-center justify-between container">
          <img src={logo} alt="Trampo Finder" className="w-[168] h-[28px] " />
          <nav>
            <ul className="flex justify-center items-center w-full max-w-[527px] h-[27px] gap-5">
              <li className="cursor-pointer flex flex-col relative w-[45px] items-center">
                <span className="text-white font-semibold">Início</span>
                <div className="bg-brand-2 h-1 w-full absolute rounded-br-1 rounded-bl-1 top-6" />
              </li>

              <li className="text-white opacity-50 cursor-pointer">Vagas</li>
              <li className="text-white opacity-50 cursor-pointer">
                Sobre nós
              </li>
              <li className="text-white opacity-50 cursor-pointer">Contato</li>
            </ul>
          </nav>
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
