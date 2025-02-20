/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";

import { ReportManagementContext } from "../../../contexts/ReportContext";
import { api } from "../../../services";
import { CandidateReportViewCard } from "./CandidateReportViewCard";
import { CandidateReportCard } from "./CandidateReportCard";
export const ListReportUsers = () => {
  const [loading, setLoading] = useState(false);
  const {
    reportViewCandidates,
    setReportViewCandidates,
    reportResumeCandidates,
    setReportResumeCandidates,
    view,
  } = useContext(ReportManagementContext);
  const getReportCandidates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("@TOKEN");
      const [candidatesStatisticResponse, candidatesResumeReport] =
        await Promise.all([
          api.get("/candidates-report/view", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/candidates-report", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      if (candidatesStatisticResponse.status === 200) {
        setReportViewCandidates(candidatesStatisticResponse.data);
      }
      if (candidatesResumeReport.status === 200) {
        setReportResumeCandidates(candidatesResumeReport.data);
      }
    } catch (error) {
      console.error("Error fetching report candidates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportCandidates();
  }, []);

  return (
    <div>
      {loading && <p>Carregando...</p>}
      <ul className="h-full w-full flex flex-col gap-3">
        {!loading &&
          view === "grid" &&
          reportViewCandidates?.map((candidate) => {
            return (
              <CandidateReportViewCard key={candidate.userId} {...candidate} />
            );
          })}
        {!loading &&
          view === "list" &&
          reportResumeCandidates?.map((candidate) => {
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
