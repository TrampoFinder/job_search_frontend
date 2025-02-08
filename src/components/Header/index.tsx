import logo from "../../assets/Logo.svg";

import { Button } from "../Button";
export const Header = () => {
  return (
    <header>
      <div className="w-full flex justify-center bg-black-20 h-[81px]">
        <div className="flex items-center justify-between container">
          <img src={logo} alt="Trampo Finder" className="w-[168] h-[28px]" />
          {/* <nav>
            <ul className="flex justify-center items-center w-[527px] h-[27px] gap-5">
              <li className="text-white">Inicio</li>
              <li className="text-white">Vagas</li>
              <li className="text-white">Sobre nós</li>
              <li className="text-white">Contato</li>
            </ul>
          </nav> */}
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
