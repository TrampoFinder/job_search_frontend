/* eslint-disable react-hooks/exhaustive-deps */
import graySearchIcon from "../../assets/gray-search.svg";
import { BlackHeader } from "../../components/Header/BlackHeader";
import { BlackFooter } from "../../components/Footer";
import chevronDrown from "../../assets/chevron-down.svg";
import mapPin from "../../assets/map-pin.svg";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext, useState, useEffect } from "react";
import { JobManagementContext } from "../../contexts/JobContext";
import { SearchByDateForm } from "../../components/Form/SearchByDateForm";
import { ListJobs } from "../../components/ListBox/ListJobs";
import { PaginationFooter } from "../../components/Footer/PaginationFooter";
import { MotivatingCard } from "../../components/MotivatingCard";
import './style.css'
import { ModalWrapper } from "../../components/Modal";
import { ProfileDataContent } from "../../components/ProfileDataContent";
export const UserProfile = () => {
  const { getJobsPagination, isModalOpen, setFilteredJobs } =
    useContext(JobManagementContext);
  const locations = getJobsPagination?.data.map((job) => job.location);
  const uniqueLocations = [...new Set(locations)];

  const [selectedLocation, setSelectedLocation] =
    useState<string>("todos_os_locais");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterByLocation = (location: string) => {
    const jobsData = getJobsPagination?.data || [];
    if (location === "todos_os_locais") {
      setFilteredJobs(jobsData);
    } else {
      const filteredJobs = jobsData.filter((job) => job.location === location);
      setFilteredJobs(filteredJobs);
    }
  };

   const filterByCompany = (query: string) => {
    const jobsData = getJobsPagination?.data || [];
    if (!query) {
      setFilteredJobs(jobsData);
    } else {
      const filteredJobs = jobsData.filter((job) =>
        job.company.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filteredJobs);
    }
  };

  useEffect(() => {
    // Filtra os jobs toda vez que a localidade for alterada
    filterByLocation(selectedLocation);
    
  }, [selectedLocation, getJobsPagination?.data, setFilteredJobs]);

  useEffect(() => {
    // Filtra os jobs toda vez que o valor da pesquisa mudar
    filterByCompany(searchQuery);
  }, [searchQuery, getJobsPagination?.data]);

  return (
    <>
      {isModalOpen && <ModalWrapper />}
      <div className="flex flex-col">
        <BgContentTop height="profile">
          <BlackHeader />
          <section className="container flex justify-center items-center pt-7 gap-6 container-apply">
            <ProfileDataContent/>
            <MotivatingCard />
          </section>
        </BgContentTop>
        <div  className="bg-white h-auto">
          <main id="work_area" className="container-apply flex gap-[18px] pt-9 pb-10 relative">
            <aside id="search" className="max-w-[316px] w-full bg-brand-1/20 h-[656px] rounded-[20px] flex flex-col items-start justify-start p-5 gap-[24px]">
              <div className="flex flex-col gap-5 w-full">
                <span className="text-[20px] font-semibold text-black">
                  Procure por empresa
                </span>
                <label htmlFor="search_enterprise">
                  <div id="find_company"className="flex w-full max-w-[276px] h-[40px] bg-white text-black items-center p-2.5 rounded-[12px] gap-3">
                    <img
                      src={graySearchIcon}
                      alt="Search"
                      className="w-[20px] h-[20px]"
                    />
                    <input
                      type="text"
                      id="search_enterprise3"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="outline-none text-gray-500 leading-1"
                      placeholder="Nome de uma empresa..."
                    />
                  </div>
                </label>
              </div>
              <div id="find_local" className="flex flex-col gap-5 w-full">
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
                    id="search_enterprise2"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="outline-none appearance-none text-gray-500 bg-transparent w-full"
                  >
                    <option value="todos_os_locais">Todos os locais</option>
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
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
            <div  id="results" className="flex flex-col w-full gap-10">
              <div   className="w-full h-10 flex justify-between items-center">
                <span className="text-gray-500">
                  {getJobsPagination &&
                    `Mostrando ${getJobsPagination.data.length}-${getJobsPagination.data.length} de ${getJobsPagination.total} resultados`}
                </span>
                <div id="order" className="border-[2px] border-gray-400 rounded-[6px] max-w-40 w-full flex items-center justify-between relative pl-3">
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
              <ListJobs />
              <PaginationFooter />
            </div>
          </main>
          <BlackFooter />
        </div>
      </div>
    </>
  );
};
