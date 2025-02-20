import nizos from "../../assets/nizos.svg";
import angleUP from "../../assets/angle-up.png";
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
        <img src={nizos} alt="Nizos" />
        <span className="text-white font-normal text-2">
          © 2025 - Todos os direitos reservados.
        </span>
        <div
          className="cursor-pointer bg-white-10 w-[50px] h-[50px] flex items-center justify-center"
          onClick={scrollToTop}
        >
          <img src={angleUP} alt="Seta para cima" />
        </div>
      </div>
    </footer>
  );
};
