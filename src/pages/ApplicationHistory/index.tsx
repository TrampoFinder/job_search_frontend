import graySearchIcon from "../../assets/gray-search.svg";
import { BlackHeader } from "../../components/Header/BlackHeader";
import enterprise from "../../assets/enterprise.svg";
import { BlackFooter } from "../../components/Footer";
import chevronDrown from "../../assets/chevron-down.svg";
import mapPin from "../../assets/map-pin.svg";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext } from "react";
import { IdentityContext } from "../../contexts/IdentityContext";
import { JobManagementContext } from "../../contexts/JobContext";
import { SearchByDateForm } from "../../components/Form/SearchByDateForm";
import { PaginationFooter } from "../../components/Footer/PaginationFooter";
import { MotivatingCard } from "../../components/MotivatingCard";
import { ModalApplyJob } from "../../components/Modal/ModalApplyJob";
import { ListApplicationJobs } from "../../components/ListBox/ListApplicationJobs";

export const ApplicationHistory = () => {
  const { user } = useContext(IdentityContext);
  const { getJobsPagination, isModalOpen, applicationJobs } =
    useContext(JobManagementContext);
  const fullName = user?.firstName + " " + user?.lastName;

  return (
    <>
      {isModalOpen && <ModalApplyJob />}
      <div className="flex flex-col">
        <BgContentTop height="profile">
          <BlackHeader />
          <section className="container-apply flex justify-center items-center pt-7 gap-6">
            <div className="w-full max-w-[512px] bg-transparente h-[200px] custom-shadow-40 flex flex-col pl-5 pt-2 gap-2">
              <h3 className="text-white text-[20px] font-semibold">
                Bem-vinde <span className="text-brand-2">{fullName}</span>
              </h3>
              <span className="text-white">Ultimas candidaturas:</span>
              <ul className="flex flex-col gap-2 pl-2.5">
                {applicationJobs &&
                  applicationJobs.slice(-3).map((job) => (
                    <li className="flex items-center gap-3" key={job.id}>
                      <div className="rounded-full w-[30px] h-[30px] custom-shadow-80 flex items-center justify-center">
                        <img
                          src={enterprise}
                          alt="Enterprise"
                          className="w-[20px] h-[20px]"
                        />
                      </div>
                      <span className="text-white font-semibold text-2">
                        {job.title}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <MotivatingCard />
          </section>
        </BgContentTop>
        <div className="bg-white h-auto">
          <main className="container-apply flex gap-[18px] pt-9 pb-10 relative">
            <aside className="max-w-[316px] w-full bg-brand-1/20 h-[656px] rounded-[20px] flex flex-col items-start justify-start p-5 gap-[24px]">
              <div className="flex flex-col gap-5 w-full">
                <span className="text-[20px] font-semibold text-black">
                  Procure por empresa
                </span>
                <label htmlFor="search_enterprise">
                  <div className="flex w-full max-w-[276px] h-[40px] bg-white text-black items-center p-2.5 rounded-[12px] gap-3">
                    <img
                      src={graySearchIcon}
                      alt="Search"
                      className="w-[20px] h-[20px]"
                    />
                    <input
                      type="text"
                      id="search_enterprise"
                      className="outline-none text-gray-500 leading-1"
                      placeholder="Nome de uma empresa..."
                    />
                  </div>
                </label>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <span className="text-[20px] font-semibold text-black">
                  Localidade
                </span>
                <div className="flex w-full max-w-[276px] h-[40px] bg-white text-black items-center p-2.5 rounded-[12px] gap-3 relative">
                  <img
                    src={mapPin}
                    alt="location"
                    className="w-[20px] h-[20px]"
                  />
                  <select
                    id="search_enterprise"
                    // value={selectedLocation}
                    // onChange={handleLocationChange}
                    className="outline-none appearance-none text-gray-500 bg-transparent w-full"
                  >
                    <option value="">Selecione o local</option>
                  </select>
                  <img
                    src={chevronDrown}
                    alt="Arrow Down"
                    className="absolute right-2 z-[5]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 max-w-[203px] w-full">
                <span className="text-[20px] font-semibold text-black">
                  Data de postagem
                </span>
                <SearchByDateForm />
              </div>
              <div>
                <span className="text-[20px] font-semibold text-black">
                  Tags
                </span>
              </div>
            </aside>
            <div className="flex flex-col w-full gap-10">
              <div className="w-full h-10 flex justify-between items-center">
                <span className="text-gray-500">
                  {getJobsPagination &&
                    `Mostrando ${getJobsPagination.data.length}-${getJobsPagination.data.length} de ${getJobsPagination.total} resultados`}
                </span>
                <div className="border-[2px] border-gray-400 rounded-[6px] max-w-40 w-full flex items-center justify-between relative pl-3">
                  <select className="outline-none appearance-none text-2 text-gray-500 bg-transparent w-full">
                    <option value="">Mais recentes</option>
                    <option value="">Date</option>
                    <option value="">Relevance</option>
                  </select>
                  <img
                    src={chevronDrown}
                    alt="Arrow Down"
                    className="absolute right-2 z-[5]"
                  />
                </div>
              </div>
              <ListApplicationJobs />
              <PaginationFooter />
            </div>
          </main>
          <BlackFooter />
        </div>
      </div>
    </>
  );
};
