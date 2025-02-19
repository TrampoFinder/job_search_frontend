export interface ReportManagementProviderProps {
  children: React.ReactNode;
}

export interface ReportManagementContextProps {
  reportViewCandidates: [] | ReportCandidateViewProps[];
  setReportViewCandidates: React.Dispatch<
    React.SetStateAction<[] | ReportCandidateViewProps[]>
  >;
  reportCandidatesDownload: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  setReportCandidates: React.Dispatch<
    React.SetStateAction<ReportCandidateProps | null>
  >;
  reportCandidates: ReportCandidateProps | null;
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

export interface ReportCandidateProps {
  statusCounts: {
    status: string | null;
    count: number;
  }[];
  totalApplications: number;
  applications: {
    userId: string;
    fullName: string | null;
    status: string | null;
    createdAt: Date;
    totalApplications: number;
    statusCount: number;
  }[];
  total: number;
}
