import { useContext, useEffect, useState } from "react";
import { JobManagementContext } from "../../contexts/JobContext";
import enterprise from "../../assets/enterprise.svg";
import { IdentityContext } from "../../contexts/IdentityContext";
import { ReportCandidateViewProps } from "../../contexts/ReportContext/@types";
import { api } from "../../services";
import { ReportManagementContext } from "../../contexts/ReportContext";
import utilizador from "../../assets/utilizador.png";
export const AdminProfileDataContent = () => {
  const { applicationJobs, applicationHistory } =
    useContext(JobManagementContext);
  const { reportViewCandidates } = useContext(ReportManagementContext);
  const { user, token } = useContext(IdentityContext);
  const [, setLoading] = useState(false);
  const [candidateReport, setCandidateReport] =
    useState<ReportCandidateViewProps | null>(null);
  const fullName = user?.firstName + " " + user?.lastName;
  function getGreetings() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return "Bom dia,";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde,";
    } else {
      return "Boa noite,";
    }
  }

  useEffect(() => {
    const getReportCandidateById = async () => {
      setLoading(true);
      try {
        if (!token || !user) {
          return;
        }
        applicationHistory(1, setLoading);
        if (applicationJobs && applicationJobs?.data.length > 0) {
          const response = await api.get(`/candidates-report/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCandidateReport(response.data);
        }
      } catch (error) {
        console.error("Error fetching report candidates", error);
      } finally {
        setLoading(false);
      }
    };
    getReportCandidateById();
  }, [user, token]);
  console.log(reportViewCandidates);
  return (
    <div className="w-full bg-transparente flex-1 items-start justify-between custom-shadow-40 h-auto">
      <div className="flex flex-col w-full">
        <div className="flex justify-between pt-5 pl-5 pr-5">
          <div className="flex flex-col h-20 w-full">
            <h3 className="text-white lg:text-[20px] md:text-1 text-2 font-semibold">
              {getGreetings()} <span className="text-brand-2">{fullName}</span>!{" "}
            </h3>
            <span className="text-white lg:text-3 md:text-[12px] text-[10px]">
              Acompanhe as candidaturas dos candidatos de forma eficiente e
              simples.
            </span>
          </div>
        </div>
        <div className="flex flex-col pl-5 pr-5 gap-4">
          <div className="flex gap-2 h-3 md:h-4 items-center">
            <img
              src={enterprise}
              alt="Enterprise"
              className="lg:w-[18px] lg:h-[18px] md:w-4 md:h-4 w-3 h-3"
            />
            <span className="text-white text-[12px] md:text-3 lg:text-2">
              Últimos usuários a se aplicarem em vagas.
            </span>
          </div>
          <ul
            className="flex gap-2 overflow-y-auto md:w-full md:flex-col md:overflow-y-scroll mb-5 max-h-[215px] sm:overflow-hidden sm:w-[300px] w-full sm:overflow-x-scroll"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {reportViewCandidates &&
              reportViewCandidates.data.slice(-3).map((job: any) => (
                <li className="flex flex-col gap-3 bg-brand-1/10 p-3 md:w-full sm:w-[240px] min-w-[240px]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-poppins text-2 text-white">
                        {job.fullName}
                      </h3>
                      {/* <p className="text-[#8a8aff] mt-1">{job.title}</p> */}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
