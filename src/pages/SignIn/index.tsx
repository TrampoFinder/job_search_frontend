import { Header } from "../../components/Header";
import bgHeader from "../../assets/backgroundpage.jpg";
import nizos from "../../assets/nizos.png";
import angleUP from "../../assets/angle-up.png";
import { SignInForm } from "../../components/Form/SignInForm";
export const SignIn = () => {
  return (
    <div
      className="bg-cover bg-center w-full flex flex-col justify-start h-auto"
      style={{ backgroundImage: `url(${bgHeader})` }}
    >
      <div className="flex flex-col justify-start h-screen bg-black-75 backdrop-blur-[14px]">
        <Header />
        <main className="container flex items-center justify-center h-full">
          <SignInForm />
        </main>
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
      </div>
    </div>
  );
};
