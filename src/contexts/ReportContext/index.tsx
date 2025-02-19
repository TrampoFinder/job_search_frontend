import { createContext, useState } from "react";
import {
  ReportCandidateProps,
  ReportCandidateViewProps,
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
  const [reportViewCandidates, setReportViewCandidates] = useState<
    ReportCandidateViewProps[] | []
  >([]);
  const [reportCandidates, setReportCandidates] =
    useState<ReportCandidateProps | null>(null);
  const token = localStorage.getItem("@TOKEN");

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

  return (
    <ReportManagementContext.Provider
      value={{
        reportViewCandidates,
        setReportViewCandidates,
        reportCandidatesDownload,
        reportCandidates,
        setReportCandidates,
      }}
    >
      {children}
    </ReportManagementContext.Provider>
  );
};

export { ReportManagementProvider, ReportManagementContext };
