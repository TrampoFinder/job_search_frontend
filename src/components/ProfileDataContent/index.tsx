import { useContext, useEffect, useState } from "react";
import { JobManagementContext } from "../../contexts/JobContext";
import enterprise from "../../assets/enterprise.svg";
import { DoughnutChart } from "./DoughnutChart";
import { IdentityContext } from "../../contexts/IdentityContext";
import { ReportCandidateViewProps } from "../../contexts/ReportContext/@types";
import { api } from "../../services";
export const ProfileDataContent = () => {
  const { applicationJobs, applicationHistory } =
    useContext(JobManagementContext);
  const { user, token } = useContext(IdentityContext);
  const [loading, setLoading] = useState(false);
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
  }, [user, token, applicationHistory, applicationJobs]);
  return (
    <div className="w-full bg-transparente flex items-start justify-between custom-shadow-40 h-auto">
      <div className="flex flex-col w-full">
        <div className="flex justify-between pt-5 pl-5 pr-5">
          <div className="flex flex-col">
            <h3 className="text-white text-[20px] font-semibold">
              {getGreetings()} <span className="text-brand-2">{fullName}</span>!{" "}
            </h3>
            <span className="text-white">
              Acompanhe suas candidaturas e avance em carreira.
            </span>
          </div>
          <div className="max-w-44 w-full h-full flex items-center justify-end">
            <DoughnutChart
              applied={candidateReport?.applied ?? "0"}
              approved={candidateReport?.approved ?? "0"}
              inProgress={candidateReport?.inProgress ?? "0"}
              rejected={candidateReport?.rejected ?? "0"}
              closed={candidateReport?.rejected ?? "0"}
              notProcessing={candidateReport?.notProcessing ?? "0"}
              size={85}
            />
          </div>
        </div>
        <div className="flex flex-col pl-5 pr-5 gap-4">
          <div className="flex gap-2">
            <img
              src={enterprise}
              alt="Enterprise"
              className="w-[20px] h-[20px]"
            />
            <span className="text-white">
              Últimas empresas que você se candidatou
            </span>
          </div>
          <ul className="flex flex-col gap-2 overflow-hidden overflow-y-scroll mb-5 max-h-[215px]">
            {applicationJobs &&
              applicationJobs.data.slice(-3).map((job) => (
                <li
                  className="flex flex-col gap-3 bg-brand-1/10 p-3"
                  key={job.id}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-poppins text-2 text-white">
                        {job.company}
                      </h3>
                      {/* <p className="text-[#8a8aff] mt-1">{job.title}</p> */}
                    </div>
                    <span className="text-brand-1 text-sm">
                      {new Date(job.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="bg-brand-1/10 text-brand-1 px-3 py-1 rounded-full text-3">
                      {job.status}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
