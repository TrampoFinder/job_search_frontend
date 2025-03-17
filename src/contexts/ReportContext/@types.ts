export interface ReportManagementProviderProps {
  children: React.ReactNode;
}

export interface ReportManagementContextProps {
  reportViewCandidates: null | ReportCandidateViewDataProps;
  setReportViewCandidates: React.Dispatch<
    React.SetStateAction<null | ReportCandidateViewDataProps>
  >;
  reportCandidatesDownload: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  setReportResumeCandidates: React.Dispatch<
    React.SetStateAction<ReportCandidateResumeDataProps | null>
  >;
  reportResumeCandidates: ReportCandidateResumeDataProps | null;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  getReportCandidatesView: (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  getReportCandidatesResume: (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
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

interface PaginationProps {
  total: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}
export interface ReportCandidateViewDataProps extends PaginationProps {
  data: ReportCandidateViewProps[];
}

export interface ReportCandidateResumeDataProps extends PaginationProps {
  data: ReportCandidateResumeProps[];
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
