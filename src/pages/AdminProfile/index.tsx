import { BlackHeader } from "../../components/Header/BlackHeader";
import { BlackFooter } from "../../components/Footer";
import chevronDrown from "../../assets/chevron-down.svg";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext } from "react";
import { IdentityContext } from "../../contexts/IdentityContext";
import { JobManagementContext } from "../../contexts/JobContext";
import graySearchIcon from "../../assets/gray-search.svg";
import { MotivatingCard } from "../../components/MotivatingCard";
import { ModalApplyJob } from "../../components/Modal/ModalApplyJob";
import { ListReportUsers } from "../../components/ListBox/ListReportUsers";

export const AdminProfile = () => {
  const { user } = useContext(IdentityContext);
  const { isModalOpen } = useContext(JobManagementContext);
  const fullName = user?.firstName + " " + user?.lastName;

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
            </aside>
            <div className="flex flex-col w-full gap-10">
              <ListReportUsers />
            </div>
          </main>
          <BlackFooter />
        </div>
      </div>
    </>
  );
};
