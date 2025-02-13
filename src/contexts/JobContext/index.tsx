import { createContext, useState } from "react";
import {
  GetAllJobsContextProps,
  JobContextProps,
  JobManagementContextProps,
  JobManagementProviderProps,
} from "./@types";
import { api } from "../../services";

const JobManagementContext = createContext({} as JobManagementContextProps);
const JobManagementProvider = ({ children }: JobManagementProviderProps) => {
  const [job, setJob] = useState<JobContextProps | null>(null);
  const [getJobs, setJobs] = useState<GetAllJobsContextProps | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobContextProps[] | []>();
  const retrieveJobs = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get("/job-management");
      if (response.status === 200) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const filterByTime = (dataArray: JobContextProps[], timeFilter: string) => {
    const now = new Date();
    const getDateDifference = (date: Date, timeFilter: string): boolean => {
      const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const filters: Record<string, number> = {
        ultima_hora: 1,
        ultimas_24_horas: 24,
        ultimos_7_dias: 7,
        ultimos_30_dias: 30,
        ultima_semana: 7,
        ultimo_mes: 30,
      };

      const daysThreshold = filters[timeFilter];
      if (!daysThreshold) return false;

      return diffDays <= daysThreshold;
    };

    return dataArray.filter((item) =>
      getDateDifference(item.createdAt, timeFilter)
    );
  };
  return (
    <JobManagementContext.Provider
      value={{
        job,
        setJob,
        getJobs,
        setJobs,
        retrieveJobs,
        filterByTime,
        filteredJobs,
        setFilteredJobs,
      }}
    >
      {children}
    </JobManagementContext.Provider>
  );
};

export { JobManagementProvider, JobManagementContext };
