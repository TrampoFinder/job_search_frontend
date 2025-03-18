import { BlackHeader } from "../../components/Header/BlackHeader";
import briefcase from "../../assets/briefcase.svg";
import enterprise from "../../assets/enterprise.svg";
import linkedin from "../../assets/linkedin-logo.png";
import { CardJob } from "../../components/ListBox/ListJobs/CardJob";
import { BlackFooter } from "../../components/Footer";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext, useEffect, useState } from "react";
import { JobManagementContext } from "../../contexts/JobContext";
import { SearchByCompany } from "../../components/Form/SearchByCompany";
import { useNavigate } from "react-router-dom";
import './style.css';

export const Home = () => {
  const navigate = useNavigate();

  const { retrieveJobs, retrieveJobsCount, jobsCompanyCount, getJobsPagination } =
    useContext(JobManagementContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await retrieveJobs(1, setLoading);
      await retrieveJobsCount(setLoading);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [currentPerson, setCurrentPerson] = useState(0);

  const linkLinkedIns = ["https://www.linkedin.com/in/andrewairamdasilva/", 
    "https://www.linkedin.com/in/larissa-fabiana-ferreira/", 
    "https://www.linkedin.com/in/nicole-xavier-sp/",
    "https://www.linkedin.com/in/rodolfogueiros/", 
    "https://www.linkedin.com/in/wesley-bueno/"];
  const nomes = ["Andrew da Silva", "Larissa Silva", "Nicole Xavier", "Rodolfo Gueiros", "Wesley Bueno"];

  const handleNext = () => {
    setCurrentPerson((prev) => (prev + 1) % nomes.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000); // A cada 3 segundos
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="flex flex-col">
      <BgContentTop height="home">
        <BlackHeader />
        <main className="container-apply flex flex-col justify-center items-center h-[503px] gap-20 mt-20">
          <div
            id="banner_head"
            className="flex flex-col justify-center items-center max-w-[813px] w-full gap-3"
          >
            <h2 className="text-[70px] text-white h-[169px] text-center font-bold ">
              Encontre seu emprego dos{" "}
              <span className="text-brand-1 animate-pulse">sonhos</span>!
            </h2>
            <p className="font-medium text-white">
              Conectando talentos a oportunidades: Seu caminho para o{" "}
              <span className="text-brand-1 font-semibold">sucesso </span>
              profissional.
            </p>
          </div>
          <SearchByCompany />
          <div
            id="count_results"
            className="max-w-[345px] w-full h-full max-h-[69px] flex"
          >
            <div className="max-w-[160px] w-full h-full  flex gap-3 items-center">
              <div className="w-[60px] h-[60px] bg-brand-1 rounded-full flex items-center justify-center">
                <img id="briefcase" src={briefcase} alt="briefcase" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-[20px] text-white text-center">
                  {getJobsPagination?.total || 0}
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
                  {jobsCompanyCount}
                </span>
                <span className="text-2 text-white opacity-50 text-center">
                  Empresas
                </span>
              </div>
            </div>
          </div>
        </main>
      </BgContentTop>
      
      <div className="bg-black w-full h-[100px] flex justify-center">
          <a href={linkLinkedIns[currentPerson]} className="flex items-center gap-5">
            <img src={linkedin} alt="LinkedIn" className="h-[50px] w-[50px]" />
            <h1 className="text-[70px] text-white">{nomes[currentPerson]}</h1>
          </a>
      </div>

      <div className="bg-white">
        <section className="container-apply">
          <div className="pt-[60px] flex justify-between">
            <div className="flex flex-col gap-[20px]">
              <h2 className="font-bold text-5xl">Vagas recomendadas</h2>
              <span>
              Explore as oportunidades mais recentes e encontre a vaga ideal para você.
              </span>
              <div className="flex flex-col justify-end">
                <a href="" onClick={() => navigate("/sign-in")} className="text-brand-1 underline">
                  Ver todas
                </a>
              </div>
            </div>
          </div>
          <ul className="pt-9 pb-14 h-full w-full flex flex-col gap-6">
            {getJobsPagination?.data.slice(0, 4).map((job) => {
              return <CardJob {...job} key={job.id} />;
            })}
          </ul>
        </section>
        <BlackFooter />
      </div>
    </div>
  );
};
