import nizos from "../../assets/nizos.png";
import angleUP from "../../assets/angle-up.png";
export const BlackFooter = () => {
  return (
    <footer className="bg-black w-full h-[100px]">
      <div className="container flex items-center h-full justify-between">
        <img src={nizos} alt="Nizos" />
        <span className="text-white font-normal text-2">
          © 2025 - Todos os direitos reservados.
        </span>
        <div className="cursor-pointer bg-white-10 w-[50px] h-[50px] flex items-center justify-center">
          <img src={angleUP} alt="Seta para cima" />
        </div>
      </div>
    </footer>
  );
};
