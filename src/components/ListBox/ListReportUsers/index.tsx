import { useContext, useEffect, useState } from "react";
import { ReportManagementContext } from "../../../contexts/ReportContext";
import { CandidateReportViewCard } from "./CandidateReportViewCard";
import { CandidateReportCard } from "./CandidateReportCard";
export const ListReportUsers = () => {
  const [loading, setLoading] = useState(false);
  const {
    reportViewCandidates,
    reportResumeCandidates,
    view,
    getReportCandidatesView,
    getReportCandidatesResume,
  } = useContext(ReportManagementContext);
  useEffect(() => {
    if (view === "grid") {
      getReportCandidatesView(1, setLoading);
    } else {
      getReportCandidatesResume(1, setLoading);
    }
  }, [view]);
  return (
    <div>
      {loading && <p>Carregando...</p>}
      <ul
        className={
          `h-full w-full flex gap-3 ` +
          `${view === "grid" ? "flex-wrap gap-3" : "flex-col"}`
        }
      >
        {!loading &&
          view === "grid" &&
          reportViewCandidates?.data.map((candidate) => {
            return (
              <CandidateReportViewCard key={candidate.userId} {...candidate} />
            );
          })}
        {!loading &&
          view === "list" &&
          reportResumeCandidates?.data.map((candidate) => {
            return (
              <CandidateReportCard
                key={candidate.userId}
                applied={candidate.statusCount.APPLIED}
                approved={candidate.statusCount.APPROVED}
                inProgress={candidate.statusCount.IN_PROGRESS}
                activeProcessCount={candidate.activeProcessCount}
                totalApplications={candidate.totalApplications}
                fullName={candidate.fullName}
              />
            );
          })}
      </ul>
    </div>
  );
};
