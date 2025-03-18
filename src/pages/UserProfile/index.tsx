 
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
import "./style.css";
import { ModalWrapper } from "../../components/Modal";
import { ProfileDataContent } from "../../components/ProfileDataContent";
import { CheckboxCustom } from "../../components/Form/SearchByDateForm/CheckboxCustom";
export const UserProfile = () => {
  const {
    getJobsPagination,
    isModalOpen,
    setFilteredJobs,
    retrieveFavoriteJobs,
    retrieveJobs,
  } = useContext(JobManagementContext);
  const [, setLoading] = useState(false);
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
  const [checkedFilter, setCheckedFilter] = useState(false);
  const handlerFavoriteChecked = async (_filter: string, checked: boolean) => {
    setCheckedFilter(checked);
    setLoading(true);

    if (checked) {
      await retrieveFavoriteJobs(setLoading);
    } else {
      setFilteredJobs([]);
      await retrieveJobs(1, setLoading);
    }

    setLoading(false);
  };
  const currentPage =
    getJobsPagination?.previousPage == null
      ? 1
      : getJobsPagination.previousPage + 1;
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, getJobsPagination?.total ?? 0);
  return (
    <>
      {isModalOpen && <ModalWrapper />}
      <div className="flex flex-col items-center">
        <BgContentTop>
          <BlackHeader />
          <section className="flex justify-center items-center sm:justify-between sm:items-start pt-7 gap-6 container-apply pb-7 flex-col-reverse sm:flex-row">
            <ProfileDataContent />
            <MotivatingCard />
          </section>
        </BgContentTop>
        <div className="bg-white h-auto w-screen">
          <main
            // id="work_area"
            className="container-apply gap-[18px] pt-9 pb-10 relative flex flex-col md:flex-row"
          >
            <aside
              // id="search"
              className="md:max-w-[316px] bg-brand-1/20 h-[425px] w-full md:h-[656px] rounded-[20px] flex flex-col items-start p-5 gap-2 md:gap-[24px]"
            >
              <div className="flex flex-col gap-2 md:gap-5 w-full">
                <span className="text-3 md:text-2 lg:text-[20px] font-semibold text-black">
                  Filtro por empresa
                </span>
                <label htmlFor="search_enterprise">
                  <div
                    // id="find_company"
                    className="flex w-full md:max-w-[276px] h-[40px] bg-white text-black items-center p-2.5 rounded-[12px] gap-3"
                  >
                    <img
                      src={graySearchIcon}
                      alt="Search"
                      className="w-3 h-3 md:w-[20px] md:h-[20px]"
                    />
                    <input
                      type="text"
                      id="search_enterprise3"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="outline-none text-gray-500 leading-1 text-[12px] md:text-2"
                      placeholder="Nome de uma empresa..."
                    />
                  </div>
                </label>
              </div>
              <div
                // id="find_local"
                className="flex flex-col gap-2 md:gap-5 w-full"
              >
                <span className="text-3 md:text-2 lg:text-[20px] font-semibold text-black">
                  Localidade
                </span>
                <div className="flex w-full h-[40px] bg-white text-black items-center p-2.5 rounded-[12px] gap-3 relative">
                  <img
                    src={mapPin}
                    alt="location"
                    className="h-3 w-3 md:w-[20px] md:h-[20px]"
                  />
                  <select
                    id="search_enterprise2"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="outline-none appearance-none text-gray-500 bg-transparent w-full text-[12px]"
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
              <div className="flex flex-col gap-2 md:gap-5 md:max-w-[203px] w-full">
                <span className="text-3 md:text-2 lg:text-[20px] font-semibold text-black">
                  Data de postagem
                </span>
                <SearchByDateForm />
              </div>
              <div className="flex flex-col gap-2 md:gap-5 md:max-w-[203px] w-full">
                <span className="text-3 md:text-2 lg:text-[20px] font-semibold text-black">
                  Favoritos
                </span>
                <CheckboxCustom
                  text="Todos os favoritos"
                  quantity={10}
                  value="favoritos"
                  checked={checkedFilter}
                  onChange={handlerFavoriteChecked}
                />
              </div>
            </aside>
            <div 
            // id="results" 
            className="flex flex-col w-full gap-5 sm:gap-8 md:gap-10">
              <div className="w-full h-10 flex justify-between items-center">
                <span className="text-gray-500">
                  {getJobsPagination &&
                    `Mostrando ${startIndex}-${endIndex} de ${getJobsPagination.total} resultados`}
                </span>
              </div>
              <ListJobs />
              <PaginationFooter
                nextPage={getJobsPagination?.nextPage}
                previousPage={getJobsPagination?.previousPage}
                fetch={retrieveJobs}
              />
            </div>
          </main>
          <BlackFooter />
        </div>
      </div>
    </>
  );
};
