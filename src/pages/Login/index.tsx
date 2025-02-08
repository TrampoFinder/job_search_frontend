/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "../../components/Header";
import bgHeader from "../../assets/backgroundpage.jpg";
import { Button } from "../../components/Button";
import nizos from "../../assets/nizos.png";
import angleUP from "../../assets/angle-up.png";
export const Login = () => {
  const handleLogin = (e: any) => {
    e.preventDefault();
  };
  return (
    <div
      className="bg-cover bg-center w-full flex flex-col justify-start h-screen"
      style={{ backgroundImage: `url(${bgHeader})` }}
    >
      <Header />
      <main className="container flex items-center justify-center h-full">
        <form
          onSubmit={handleLogin}
          className="max-w-[411px] w-full h-[541px] bg-[var(--color-white-10)] flex flex-col items-start p-11 rounded-[4px]"
        >
          <h2 className="title-form mb-2">Login</h2>
          <div className="flex flex-col w-full">
            <fieldset className="flex flex-col gap-y-2.5 mt-6">
              <label htmlFor="email" className="font-medium text-white">
                Email:
              </label>
              <input
                type="text"
                id="email"
                placeholder="Digite seu email"
                className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray"
              />
            </fieldset>
            <fieldset className="w-full flex flex-col gap-y-2.5 mt-6">
              <label htmlFor="password" className="font-medium text-white">
                Senha:
              </label>
              <input
                type="text"
                id="password"
                placeholder="Digite sua senha"
                className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray"
              />
            </fieldset>
            <span className="text-gray mt-2 text-end">Esqueci minha senha</span>
          </div>
          <div className="flex flex-col gap-6 w-full mt-5">
            <Button size="large" text="Entrar" type="submit" variant="brand1" />
            <span className=" text-gray text-center">
              Ainda não possui conta?
            </span>
            <Button
              size="large"
              text="Cadastrar"
              type="button"
              variant="outlinebrand1"
            />
          </div>
        </form>
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
  );
};
