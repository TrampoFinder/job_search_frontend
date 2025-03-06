export interface JobManagementProviderProps {
  children: React.ReactNode;
}

export interface JobManagementContextProps {
  job: JobCardProps | null;
  setJob: React.Dispatch<React.SetStateAction<JobCardProps | null>>;
  getJobsPagination: GetAllJobsContextProps | null;
  setJobsPagination: React.Dispatch<React.SetStateAction<GetAllJobsContextProps | null>>;
  retrieveJobs: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  filteredJobs: [] | JobContextProps[] | null;
  setFilteredJobs: React.Dispatch<
    React.SetStateAction<JobContextProps[] | null>
  >;
  filterByTime: (
    dataArray: JobContextProps[],
    timeFilter: string[]
  ) => JobContextProps[] | [];
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobApplication: (
    data: JobCardProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  applicationJob: ApplicationJobsContextProps | null;
  setApplicationJob: React.Dispatch<
    React.SetStateAction<ApplicationJobsContextProps | null>
  >;
  applicationJobs: ApplicationJobsContextProps[] | null;
  setApplicationJobs: React.Dispatch<
    React.SetStateAction<ApplicationJobsContextProps[] | null>
  >;
  applicationHistory: (
    userId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  updatedApplicationJobs: ({
    userId,
    jobId,
    status,
    note,
    setLoading,
  }: {
    userId: string;
    jobId: string;
    status: string;
    note: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => Promise<void>;
  setJobsPaginationCompanyCount: React.Dispatch<React.SetStateAction<number>>;
  jobsCompanyCount: number;
  retrieveJobsCount: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

export interface JobContextProps {
  id: string;
  title: string;
  company: string;
  status: "ACTIVE" | "INACTIVE";
  url: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface GetAllJobsContextProps {
  data: JobContextProps[];
  total: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface JobCardProps {
  id?: string;
  company?: string;
  title?: string;
  url?: string;
  status?: string;
  note?: string;
  location?: string;
  createdAt?: Date;
}
export interface ApplicationJobsContextProps {
  id: string;
  title: string;
  url: string;
  userId: string;
  jobId: string;
  status: string;
  note: string | null;
}
