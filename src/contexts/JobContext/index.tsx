import { createContext, useState } from "react";
import {
  ApplicationJobsContextProps,
  GetAllJobsContextProps,
  JobCardProps,
  JobContextProps,
  JobManagementContextProps,
  JobManagementProviderProps,
} from "./@types";
import { api } from "../../services";

const JobManagementContext = createContext({} as JobManagementContextProps);
const JobManagementProvider = ({ children }: JobManagementProviderProps) => {
  const [job, setJob] = useState<JobCardProps | null>(null);
  const [applicationJobs, setApplicationJobs] = useState<
    ApplicationJobsContextProps[] | null
  >(null);
  const [applicationJob, setApplicationJob] =
    useState<ApplicationJobsContextProps | null>(null);
  const [getJobs, setJobs] = useState<GetAllJobsContextProps | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobContextProps[] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const token = localStorage.getItem("@TOKEN");
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
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
  const filterByTime = (
    dataArray: JobContextProps[],
    timeFilters: string[]
  ) => {
    const now = new Date();

    const getDateDifference = (date: Date, timeFilter: string): boolean => {
      const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

      const filters: Record<string, number> = {
        ultima_hora: 1,
        ultimas_24_horas: 24,
        ultimos_7_dias: 7,
        ultimos_30_dias: 30,
      };
      const daysThreshold = filters[timeFilter];
      if (!daysThreshold) return false;
      if (timeFilter === "ultima_hora") {
        return diffHours <= 1;
      }
      if (timeFilter === "ultimas_24_horas") {
        return diffHours <= 24;
      }

      return diffDays <= daysThreshold;
    };
    if (timeFilters.length === 0) {
      return dataArray;
    }
    return dataArray.filter((item) =>
      timeFilters.some((filter) => getDateDifference(item.createdAt, filter))
    );
  };

  const jobApplication = async (
    data: JobCardProps | null,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    const { id, ...rest } = data;
    try {
      setLoading(true);
      await api.post(`/job-application/apply/${data?.id}`, rest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const applicationHistory = async (
    userId: string | null,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get(`/job-application/${userId}/history/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setApplicationJobs(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updatedApplicationJobs = async ({
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
  }) => {
    try {
      setLoading(true);
      const response = await api.put(
        `/job-application/${userId}/${jobId}/update/`,
        {
          status,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setApplicationJobs((prevJobs) => {
          return (
            prevJobs?.map((job) =>
              job.id === response.data.id ? response.data : job
            ) || []
          );
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        isModalOpen,
        setIsModalOpen,
        jobApplication,
        applicationJobs,
        setApplicationJobs,
        applicationHistory,
        focusIndex,
        setFocusIndex,
        updatedApplicationJobs,
        applicationJob,
        setApplicationJob,
      }}
    >
      {children}
    </JobManagementContext.Provider>
  );
};

export { JobManagementProvider, JobManagementContext };
