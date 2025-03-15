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
  useEffect(() => {
    const getReportCandidateById = async () => {
      setLoading(true);
      try {
        if (!token || !user) {
          return;
        }
        const { data } = await api.get(`/candidates-report/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidateReport(data);
        applicationHistory(user.id, setLoading);
      } catch (error) {
        console.error("Error fetching report candidates", error);
      } finally {
        setLoading(false);
      }
    };
    getReportCandidateById();
  }, [user]);
  return (
    <div className="w-full max-w-[512px] bg-transparente h-[100%] custom-shadow-40 flex justify-between">
      <div className="flex flex-col pl-5 pt-2 gap-2">
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
      <div className="max-w-44 w-full h-full flex items-center justify-center">
        <DoughnutChart
          applied={candidateReport?.applied ?? "0"}
          approved={candidateReport?.approved ?? "0"}
          inProgress={candidateReport?.inProgress ?? "0"}
          rejected={candidateReport?.rejected ?? "0"}
          closed={candidateReport?.rejected ?? "0"}
          notProcessing={candidateReport?.notProcessing ?? "0"}
          size={125}
        />
      </div>
    </div>
  );
};
