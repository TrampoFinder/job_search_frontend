export interface JobManagementProviderProps {
  children: React.ReactNode;
}

export interface JobManagementContextProps {
  job: JobCardProps | null;
  setJob: React.Dispatch<React.SetStateAction<JobCardProps | null>>;
  getJobs: GetAllJobsContextProps | null;
  setJobs: React.Dispatch<React.SetStateAction<GetAllJobsContextProps | null>>;
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
  jobs: JobContextProps[];
  total: number;
  totalPages: number;
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
