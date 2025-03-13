import { BlackHeader } from "../../components/Header/BlackHeader";
import enterprise from "../../assets/enterprise.svg";
import { BlackFooter } from "../../components/Footer";
import { BgContentTop } from "../../components/Header/BgContentTop";
import { useContext } from "react";
import { IdentityContext } from "../../contexts/IdentityContext";
import { JobManagementContext } from "../../contexts/JobContext";
import { PaginationFooter } from "../../components/Footer/PaginationFooter";
import { MotivatingCard } from "../../components/MotivatingCard";
import { ListApplicationJobs } from "../../components/ListBox/ListApplicationJobs";
import { ModalWrapper } from "../../components/Modal";

export const ApplicationHistory = () => {
  const { user } = useContext(IdentityContext);
  const { getJobsPagination, isModalOpen, applicationJobs } =
    useContext(JobManagementContext);
  const fullName = user?.firstName + " " + user?.lastName;

  return (
    <>
      {isModalOpen && <ModalWrapper />}
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
                  applicationJobs.data.slice(-3).map((job) => (
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
            <div className="flex flex-col w-full gap-10">
              <div className="w-full h-10 flex justify-between items-center">
                <span className="text-gray-500">
                  {getJobsPagination &&
                    `Mostrando ${getJobsPagination.data.length}-${getJobsPagination.data.length} de ${getJobsPagination.total} resultados`}
                </span>
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
