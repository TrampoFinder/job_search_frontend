import bgDash from "../../../assets/backgrounddash.png";
import { useState, useEffect } from "react";
interface BgContentTopProps {
  children: React.ReactNode;
  height: keyof typeof maxHeightStyle;
}
const maxHeightStyle = {
  home: "max-h-[738px]",
  profile: "max-h-[350px]",
};
export const BgContentTop = ({ children, height }: BgContentTopProps) => {
  const [profileHeight, setProfileHeight] = useState("max-h-[350px]");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 800) {
        // Para telas menores
        setProfileHeight("max-h-[650px]");
      }else if(screenWidth >= 801){
        setProfileHeight("max-h-[400px]");
      } else {
        // Para telas grandes
        setProfileHeight("max-h-[350px]");
      }
    };

    // Chamada inicial para definir a altura
    handleResize();

    // Listener para mudanças no tamanho da tela
    window.addEventListener("resize", handleResize);

    // Limpeza para evitar vazamentos de memória
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicHeight = height === "profile" ? profileHeight : "max-h-[738px]";

  return (
    <div
      className={`bg-cover w-full flex flex-col h-screen ${dynamicHeight}`}
      style={{
        backgroundImage: `url(${bgDash})`,
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col justify-start h-screen w-full bg-black-75 backdrop-blur-[14px]">
        {children}
      </div>
    </div>
  );
};
