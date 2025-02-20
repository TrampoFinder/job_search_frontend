import { BlackHeader } from "../../components/Header/BlackHeader";
import { BlackFooter } from "../../components/Footer";
import chevronDrown from "../../assets/chevron-down.svg";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext, useState } from "react";
import { IdentityContext } from "../../contexts/IdentityContext";
import { JobManagementContext } from "../../contexts/JobContext";
import graySearchIcon from "../../assets/gray-search.svg";
import { MotivatingCard } from "../../components/MotivatingCard";
import { ModalApplyJob } from "../../components/Modal/ModalApplyJob";
import { ListReportUsers } from "../../components/ListBox/ListReportUsers";
import mapPin from "../../assets/map-pin.svg";
import { CheckboxCustom } from "../../components/Form/SearchByDateForm/CheckboxCustom";
import { ReportManagementContext } from "../../contexts/ReportContext";
import { DefaultButton } from "../../components/Buttons/DefaultButton";
import { ToggleViewButton } from "../../components/Buttons/ToggleViewButton";

export const AdminProfile = () => {
  const { user } = useContext(IdentityContext);
  const { isModalOpen } = useContext(JobManagementContext);
  const {
    reportViewCandidates,
    reportCandidatesDownload,
    view,
    setView,
    reportResumeCandidates,
  } = useContext(ReportManagementContext);
  const fullName = user?.firstName + " " + user?.lastName;
  const [selectValues, setSelectValues] = useState<string[]>([]);
  const handleFilterChange = (filter: string, isChecked: boolean) => {
    const newValues = isChecked
      ? [...selectValues, filter]
      : selectValues.filter((value) => value !== filter);
    setSelectValues(newValues);
  };
  const [loading, setLoading] = useState(false);
  const validLength = () => {
    if (reportViewCandidates.length > 0 && view === "grid") {
      return `Mostrando x-x de ${reportViewCandidates.length} resultados`;
    } else if (reportResumeCandidates.length > 0 && view === "list") {
      return `Mostrando x-x de ${reportViewCandidates.length} resultados`;
    } else {
      return "Sem candidatos cadastrados no sistema";
    }
  };
  return (
    <>
      {isModalOpen && <ModalApplyJob />}
      <div className="flex flex-col">
        <BgContentTop height="profile">
          <BlackHeader />
          <section className="container flex justify-center items-center pt-7 gap-6 container-apply">
            <div className="w-full max-w-[512px] bg-transparente h-[200px] custom-shadow-40 flex flex-col pl-5 pt-2 gap-2">
              <h3 className="text-white text-[20px] font-semibold">
                Bem-vinde <span className="text-brand-2">{fullName}</span>
              </h3>
              <span className="text-white">Últimas turmas:</span>
              <ul className="flex flex-col gap-2 pl-2.5">
                {/* {applicationJobs &&
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
                  ))} */}
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
                  Procure por usuário
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
                      placeholder="Nome de um usuário..."
                    />
                  </div>
                </label>
              </div>
              <div className="flex flex-col gap-5 w-full">
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
                  Período das turmas
                </span>
                <div className="flex flex-col gap-3">
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
              </div>
              <div>
                <span className="text-[20px] font-semibold text-black">
                  Tags
                </span>
              </div>
            </aside>
            <div className="flex flex-col w-full gap-10">
              <div className="flex gap-5 w-full justify-between">
                <span className="text-[20px] font-regular text-gray-600">
                  {validLength()}
                </span>
                <div className="flex gap-5 max-w-[250px] w-full h-[40px]">
                  <ToggleViewButton view={view} onViewChange={setView} />
                  <DefaultButton
                    variant="brand1"
                    size="small"
                    type="button"
                    text="Baixar relatório"
                    className="w-full max-w-[154px]"
                    onClick={() => reportCandidatesDownload(setLoading)}
                  />
                </div>
              </div>
              <ListReportUsers/>
            </div>
          </main>
          <BlackFooter />
        </div>
      </div>
    </>
  );
};
