import angleUP from "../../assets/angle-up.png";
import logo from "../../assets/Logo.svg";

import "./style.css";
export const BlackFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="bg-black w-full h-[100px]">
      <div className="container-apply flex items-center h-full justify-between">
        <img src={logo} alt="Logo" />
        <span className="text-white font-normal text-2">
          © 2025 - Todos os direitos reservados.
        </span>
        <div
          // id="cursor"
          className="cursor-pointer w-[30px] h-[30px] bg-white-10 sm:w-[50px] sm:h-[50px] flex items-center justify-center"
          onClick={scrollToTop}
        >
          <img src={angleUP} alt="Seta para cima" />
        </div>
      </div>
    </footer>
  );
};
