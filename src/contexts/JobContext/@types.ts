export interface JobManagementProviderProps {
  children: React.ReactNode;
}

export interface JobManagementContextProps {
  job: JobContextProps | null;
  setJob: React.Dispatch<React.SetStateAction<JobContextProps | null>>;
  getJobs: GetAllJobsContextProps | null;
  setJobs: React.Dispatch<React.SetStateAction<GetAllJobsContextProps | null>>;
  retrieveJobs: (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  filteredJobs: [] | JobContextProps[] | undefined;
  setFilteredJobs: React.Dispatch<
    React.SetStateAction<JobContextProps[] | [] | undefined>
  >;
  filterByTime: (
    dataArray: JobContextProps[],
    timeFilter: string
  ) => JobContextProps[] | [];
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
