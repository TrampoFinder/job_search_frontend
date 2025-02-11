import bgDash from "../../assets/backgrounddash.png";
import searchIcon from "../../assets/search.svg";
import { Button } from "../../components/Button";
import { BlackHeader } from "../../components/Header/BlackHeader";
import briefcase from "../../assets/briefcase.svg";
import enterprise from "../../assets/enterprise.svg";
import nizos from "../../assets/nizos.svg";
import { CardJob } from "../../components/CardJob";
import { BlackFooter } from "../../components/Footer";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div
        className="bg-cover w-full flex flex-col h-screen max-h-[738px]"
        style={{
          backgroundImage: `url(${bgDash})`,
          overflow: "hidden",
        }}
      >
        <div className="flex flex-col justify-start h-screen w-full bg-black-75 backdrop-blur-[14px]">
          <BlackHeader />
          <main className="container flex flex-col justify-center items-center h-[503px] gap-20 mt-20">
            <div className="flex flex-col justify-center items-center max-w-[813px] w-full gap-3">
              <h2 className="text-[70px] text-white h-[169px] text-center font-bold leading-20">
                Encontre seu emprego dos{" "}
                <span className="text-brand-1 animate-pulse">sonhos</span>!
              </h2>
              <p className="font-medium text-white">
                Conectando talentos a oportunidades: Seu caminho para o{" "}
                <span className="text-brand-1 font-semibold">sucesso </span>
                profissional.
              </p>
            </div>
            {/* abstract select tomorrow  */}
            <div className="max-w-[645px] w-full h-20 bg-white rounded-2xl flex justify-between ">
              <div className="w-full max-w-[402px] flex items-center">
                <input
                  type="text"
                  placeholder="Digite o nome de uma empresa..."
                  className="p-5 w-full outline-none"
                />
                <div className="bg-gray-400 h-10 w-[1px]" />
              </div>
              <Button
                variant="brand1"
                size="small"
                text="Pesquisar"
                className="h-full w-full max-w-[168px] rounded-l-[0px]"
                icon={searchIcon}
              />
            </div>
            <div className="max-w-[345px] w-full h-full max-h-[69px] flex">
              <div className="max-w-[160px] w-full h-full  flex gap-3 items-center">
                <div className="w-[60px] h-[60px] bg-brand-1 rounded-full flex items-center justify-center">
                  <img src={briefcase} alt="briefcase" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[20px] text-white text-center">
                    NaN
                  </span>
                  <span className="text-2 text-white opacity-50 text-center">
                    Vagas
                  </span>
                </div>
              </div>
              <div className="max-w-[160px] w-full h-full  flex gap-3 items-center">
                <div className="w-[60px] h-[60px] bg-brand-1 rounded-full flex items-center justify-center">
                  <img src={enterprise} alt="enterprise" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[20px] text-white text-center">
                    NaN
                  </span>
                  <span className="text-2 text-white opacity-50 text-center">
                    Empresas
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <footer className="bg-black w-full h-[100px]">
        <div className="container flex items-center h-full justify-between">
          <img src={nizos} alt="Nizos" />
          <img src={nizos} alt="Nizos" />
          <img src={nizos} alt="Nizos" />
          <img src={nizos} alt="Nizos" />
          <img src={nizos} alt="Nizos" />
        </div>
      </footer>
      <div className="bg-white">
        <section className="container">
          <div className="pt-[60px] flex justify-between">
            <div className="flex flex-col gap-[40px]">
              <h2 className="font-bold text-5xl">Vagas recomendadas</h2>
              <span>
                At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
              </span>
            </div>
            <div className="flex flex-col justify-end">
              <a href="#" className="text-brand-1 underline">
                Ver todas
              </a>
            </div>
          </div>
          <ul className="pt-9 pb-14 h-full w-full flex flex-col gap-6">
            <CardJob />
            <CardJob />
            <CardJob />
            <CardJob />
          </ul>
        </section>
        <BlackFooter/>
      </div>
    </div>
  );
};
