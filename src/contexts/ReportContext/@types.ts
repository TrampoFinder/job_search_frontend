export interface ReportManagementProviderProps {
  children: React.ReactNode;
}

export interface ReportManagementContextProps {
  reportCandidates: [] | ReportCandidateProps[];
  setReportCandidates: React.Dispatch<
    React.SetStateAction<[] | ReportCandidateProps[]>
  >;
  reportCandidatesDownload: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

export interface ReportCandidateProps {
  userId: string;
  fullName: string;
  notProcessing: string;
  applied: string;
  inProgress: string;
  approved: string;
  rejected: string;
  closed: string;
}
