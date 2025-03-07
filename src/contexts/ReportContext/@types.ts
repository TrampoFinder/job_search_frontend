export interface ReportManagementProviderProps {
  children: React.ReactNode;
}

export interface ReportManagementContextProps {
  reportViewCandidates: null | ReportCandidateDataProps;
  setReportViewCandidates: React.Dispatch<
    React.SetStateAction<null | ReportCandidateDataProps>
  >;
  reportCandidatesDownload: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  setReportResumeCandidates: React.Dispatch<
    React.SetStateAction<ReportCandidateResumeProps[] | []>
  >;
  reportResumeCandidates: ReportCandidateResumeProps[] | [];
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

export interface ReportCandidateViewProps {
  userId: string;
  fullName: string;
  notProcessing: string;
  applied: string;
  inProgress: string;
  approved: string;
  rejected: string;
  closed: string;
}

export interface ReportCandidateDataProps {
  data: ReportCandidateViewProps[];
  total: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface ReportCandidateResumeProps {
  userId: string;
  fullName: string;
  totalApplications: number;
  activeProcessCount: number;
  statusCount: {
    IN_PROGRESS: number;
    APPROVED: number;
    APPLIED: number;
    REJECTED: number;
    CLOSED: number;
    NOT_PROCESSING: number;
  };
}
