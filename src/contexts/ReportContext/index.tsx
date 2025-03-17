import { createContext, useState } from "react";
import {
  ReportCandidateResumeDataProps,
  ReportCandidateViewDataProps,
  ReportManagementContextProps,
  ReportManagementProviderProps,
} from "./@types";
import { api } from "../../services";
const ReportManagementContext = createContext(
  {} as ReportManagementContextProps
);
const ReportManagementProvider = ({
  children,
}: ReportManagementProviderProps) => {
  const [reportViewCandidates, setReportViewCandidates] =
    useState<null | ReportCandidateViewDataProps>(null);
  const [reportResumeCandidates, setReportResumeCandidates] = useState<
    ReportCandidateResumeDataProps | null
  >(null);
  const token = localStorage.getItem("@TOKEN");
  const [view, setView] = useState("grid");

  const reportCandidatesDownload = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get("/candidates-report/download", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "candidates-report.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getReportCandidatesView = async (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/candidates-report/view?page=${page}&pageSize=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setReportViewCandidates(response.data);
      }
    } catch (error) {
      console.error("Error fetching report candidates", error);
    } finally {
      setLoading(false);
    }
  };

  const getReportCandidatesResume = async (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/candidates-report?page=${page}&pageSize=20`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setReportResumeCandidates(response.data);
      }
    } catch (error) {
      console.error("Error fetching report candidates", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReportManagementContext.Provider
      value={{
        reportViewCandidates,
        setReportViewCandidates,
        reportCandidatesDownload,
        reportResumeCandidates,
        setReportResumeCandidates,
        view,
        setView,
        getReportCandidatesView,
        getReportCandidatesResume,
      }}
    >
      {children}
    </ReportManagementContext.Provider>
  );
};

export { ReportManagementProvider, ReportManagementContext };
