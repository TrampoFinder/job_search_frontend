import { BlackHeader } from "../../components/Header/BlackHeader";
import { BlackFooter } from "../../components/Footer";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext } from "react";
import { JobManagementContext } from "../../contexts/JobContext";
import { PaginationFooter } from "../../components/Footer/PaginationFooter";
import { MotivatingCard } from "../../components/MotivatingCard";
import { ListApplicationJobs } from "../../components/ListBox/ListApplicationJobs";
import { ModalWrapper } from "../../components/Modal";
import { ProfileDataContent } from "../../components/ProfileDataContent";

export const ApplicationHistory = () => {
  const { isModalOpen, applicationJobs, applicationHistory } = useContext(JobManagementContext);
  const currentPage =
    applicationJobs?.previousPage == null
      ? 1
      : applicationJobs.previousPage + 1;
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, applicationJobs?.total ?? 0);
  return (
    <>
      {isModalOpen && <ModalWrapper />}
      <div className="flex flex-col">
        <BgContentTop height="profileUser">
          <BlackHeader />
          <section className="container-apply flex justify-center pt-7 gap-6">
            <ProfileDataContent />
            <MotivatingCard />
          </section>
        </BgContentTop>
        <div className="bg-white h-auto">
          <main className="container-apply flex gap-[18px] pt-9 pb-10 relative">
            <div className="flex flex-col w-full gap-10">
              <div className="w-full h-10 flex justify-between items-center">
                <span className="text-gray-500">
                  {applicationJobs &&
                    `Mostrando ${startIndex}-${endIndex} de ${applicationJobs.total} resultados`}
                </span>
              </div>
              <ListApplicationJobs />
              <PaginationFooter previousPage={applicationJobs?.previousPage} nextPage={applicationJobs?.nextPage} fetch={applicationHistory} />
            </div>
          </main>
          <BlackFooter />
        </div>
      </div>
    </>
  );
};
