import { BlackHeader } from "../../components/Header/BlackHeader";
import { BlackFooter } from "../../components/Footer";
import chevronDrown from "../../assets/chevron-down.svg";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext, useEffect, useState } from "react";
import { IdentityContext } from "../../contexts/IdentityContext";
import { JobManagementContext } from "../../contexts/JobContext";
import graySearchIcon from "../../assets/gray-search.svg";
import { MotivatingCard } from "../../components/MotivatingCard";
import { ListReportUsers } from "../../components/ListBox/ListReportUsers";
import mapPin from "../../assets/map-pin.svg";
import { CheckboxCustom } from "../../components/Form/SearchByDateForm/CheckboxCustom";
import { ReportManagementContext } from "../../contexts/ReportContext";
import { DefaultButton } from "../../components/Buttons/DefaultButton";
import { ToggleViewButton } from "../../components/Buttons/ToggleViewButton";
import "./style.css";
import { ModalWrapper } from "../../components/Modal";
import { PaginationFooter } from "../../components/Footer/PaginationFooter";
import { AdminProfileDataContent } from "../../components/AdminProfilDataContent";

export const AdminProfile = () => {
  const { isModalOpen } = useContext(JobManagementContext);
  const {
    reportViewCandidates,
    reportCandidatesDownload,
    view,
    setView,
    getReportCandidatesView,
  } = useContext(ReportManagementContext);
  const [selectValues, setSelectValues] = useState<string[]>([]);
  const [textButton, setTextButton] = useState("Baixar Relatório");
  const handleFilterChange = (filter: string, isChecked: boolean) => {
    const newValues = isChecked
      ? [...selectValues, filter]
      : selectValues.filter((value) => value !== filter);
    setSelectValues(newValues);
  };
  const [, setLoading] = useState(false);
  const perPage = view != "grid" ? 20 : 10;
  const currentPage =
    reportViewCandidates?.previousPage == null
      ? 1
      : reportViewCandidates.previousPage + 1;
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(
    currentPage * perPage,
    reportViewCandidates?.total ?? 0
  );

  useEffect(() => {
    getReportCandidatesView(1, setLoading);
  }, []);

  const updateTextButton = () => {
    const larguraTela = window.innerWidth;
    if (larguraTela < 600) {
      setTextButton("Relatório");
    } else {
      setTextButton("Baixar relatório");
    }
  };

  useEffect(() => {
    updateTextButton();
    window.addEventListener("resize", updateTextButton);
    return () => {
      window.removeEventListener("resize", updateTextButton);
    };
  }, []);

  return (
    <>
      {isModalOpen && <ModalWrapper />}
      <div className="flex flex-col">
        <BgContentTop>
          <BlackHeader />
          <section className="flex justify-center items-center sm:justify-between sm:items-start pt-7 gap-6 container-apply pb-7 flex-col-reverse sm:flex-row">
            <AdminProfileDataContent />
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
              className="md:max-w-[316px] bg-brand-1/20 h-[120px] w-full md:h-[656px] rounded-[20px] flex flex-col items-start p-5 gap-2 md:gap-[24px]"
            >
              <div className="flex flex-col gap-2 md:gap-5 w-full">
                <span className="text-3 md:text-2 lg:text-[20px] font-semibold text-black">
                  Procure por usuário
                </span>
                <label
                  // id="find_user"
                  htmlFor="search_enterprise"
                >
                  <div className="flex w-full md:max-w-[276px] h-[40px] bg-white text-black items-center p-2.5 rounded-[12px] gap-3">
                    <img
                      src={graySearchIcon}
                      alt="Search"
                      className="w-[20px] h-[20px]"
                    />
                    <input
                      type="text"
                      id="search_enterprise"
                      className="outline-none  text-gray-500 leading-1"
                      placeholder="Nome de um usuário..."
                    />
                  </div>
                </label>
              </div>
              {/* <div id="find_turma" className="flex flex-col gap-5 w-full">
                <span className="text-[20px] font-semibold text-black">
                  Turma
                </span>
                <div className="flex w-full max-w-[276px] h-[40px] bg-white text-black items-center p-2.5 rounded-[12px] gap-3 relative">
                  <img src={mapPin} alt="Class" className="w-[20px] h-[20px]" />
                  <select
                    id="search_per_class"
                    // value={selectedLocation}
                    // onChange={handleLocationChange}
                    className="outline-none appearance-none text-gray-500 bg-transparent w-full"
                  >
                    <option value="">Selecione a turma</option>
                    {/* {uniqueLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))} */}
              {/* </select>
                  <img
                    src={chevronDrown}
                    alt="Arrow Down"
                    className="absolute right-2 z-[5]"
                  />
                </div>
              </div> */}
              {/* <div className="flex flex-col gap-5 max-w-[203px] w-full">
                <span className="text-[20px] font-semibold text-black">
                  Período das turmas
                </span>
                <div id="options" className="flex flex-col gap-3">
                  <CheckboxCustom
                    text="Todas as turmas"
                    value="all_classes"
                    checked={selectValues.includes("all_classes")}
                    quantity={10}
                    onChange={handleFilterChange}
                  />
                  <CheckboxCustom
                    text="Último mês"
                    value="last_month"
                    quantity={10}
                    checked={selectValues.includes("last_month")}
                    onChange={handleFilterChange}
                  />
                  <CheckboxCustom
                    text="Últimos 6 meses"
                    value="last_six_months"
                    quantity={10}
                    checked={selectValues.includes("last_six_months")}
                    onChange={handleFilterChange}
                  />
                  <CheckboxCustom
                    text="Último ano"
                    value="last_year"
                    quantity={10}
                    checked={selectValues.includes("last_year")}
                    onChange={handleFilterChange}
                  />
                </div>
              </div> */}
              {/* <div>
                <span className="text-[20px] font-semibold text-black">
                  Tags
                </span>
              </div> */}
            </aside>
            <div
              // id="relatorio"
              className="flex flex-col w-full gap-5 sm:gap-8 md:gap-10"
            >
              <div className="w-full h-10 flex md:flex-wrap justify-between items-center">
                <span className="text-3 text-center sm:text-2 md:text-1 lg:text-[20px] font-regular text-gray-600">
                  {reportViewCandidates &&
                    `Mostrando ${startIndex}-${endIndex} de ${reportViewCandidates.total} resultados`}
                </span>
                <div
                  // id="buttom_relatorio"
                  className="flex gap-5 max-w-[200px] sm:max-w-[250px] w-full h-[40px]"
                >
                  <ToggleViewButton view={view} onViewChange={setView} />
                  <DefaultButton
                    variant="brand1"
                    size="small"
                    type="button"
                    text={textButton}
                    className="w-full max-w-[100px] sm:max-w-[154px] "
                    onClick={() => reportCandidatesDownload(setLoading)}
                  />
                </div>
              </div>
              <ListReportUsers />
              <PaginationFooter
                nextPage={reportViewCandidates?.nextPage}
                previousPage={reportViewCandidates?.previousPage}
                fetch={getReportCandidatesView}
              />
            </div>
          </main>
          <BlackFooter />
        </div>
      </div>
    </>
  );
};
