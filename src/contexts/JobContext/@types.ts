export interface JobManagementProviderProps {
  children: React.ReactNode;
}

export interface JobManagementContextProps {
  job: JobCardProps | null;
  setJob: React.Dispatch<React.SetStateAction<JobCardProps | null>>;
  getJobsPagination: GetAllJobsContextProps | null;
  setJobsPagination: React.Dispatch<
    React.SetStateAction<GetAllJobsContextProps | null>
  >;
  retrieveJobs: (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  filteredJobs: [] | JobContextProps[];
  setFilteredJobs: React.Dispatch<React.SetStateAction<JobContextProps[] | []>>;
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
  applicationJobs: GetAllJobsApplicationContextProps | null;
  setApplicationJobs: React.Dispatch<
    React.SetStateAction<GetAllJobsApplicationContextProps | null>
  >;
  applicationHistory: (
    page: number,
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
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  addFavoriteJob: (
    jobId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  retrieveFavoriteJobs: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  deleteFavoriteJob: (
    jobId: string,
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

interface PaginationProps {
  total: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface GetAllJobsContextProps extends PaginationProps {
  data: JobContextProps[];
}

export interface JobCardProps {
  id?: string;
  isFavorite?: boolean;
  company?: string;
  title?: string;
  url?: string;
  status?: string;
  note?: string;
  location?: string;
  createdAt?: Date;
}

export interface GetAllJobsApplicationContextProps extends PaginationProps {
  data: ApplicationJobsContextProps[];
}
export interface ApplicationJobsContextProps {
  id: string;
  title: string;
  url: string;
  userId: string;
  company: string;
  jobId: string;
  status: string;
  note: string | null;
  createdAt: Date;
}

interface FavoriteJobProps {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
