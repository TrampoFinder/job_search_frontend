import { createContext, useState } from "react";
import {
  ApplicationJobsContextProps,
  GetAllJobsApplicationContextProps,
  GetAllJobsContextProps,
  JobCardProps,
  JobContextProps,
  JobManagementContextProps,
  JobManagementProviderProps,
} from "./@types";
import { api } from "../../services";

const JobManagementContext = createContext({} as JobManagementContextProps);
const JobManagementProvider = ({ children }: JobManagementProviderProps) => {
  const [modalType, setModalType] = useState("");
  const [job, setJob] = useState<JobCardProps | null>(null);
  const [applicationJobs, setApplicationJobs] =
    useState<GetAllJobsApplicationContextProps | null>(null);
  const [applicationJob, setApplicationJob] =
    useState<ApplicationJobsContextProps | null>(null);
  const [getJobsPagination, setJobsPagination] =
    useState<GetAllJobsContextProps | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobContextProps[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const token = localStorage.getItem("@TOKEN");
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [jobsCompanyCount, setJobsPaginationCompanyCount] = useState(0);
  const retrieveJobs = async (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/job-management?page=${page}&pageSize=10`
      );
      if (response.status === 200) {
        setJobsPagination(response.data);
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
    try {
      setLoading(true);
      const { id, ...rest } = data ?? {};
      await api.post(`/job-application/apply/${id}`, rest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applicationHistory = async (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/job-application/history?page=${page}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        setApplicationJobs({
          ...applicationJobs!,
          data: [...applicationJobs!.data, response.data],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const retrieveJobsCount = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get("/job-management/companies");
      if (response.status === 200) {
        setJobsPaginationCompanyCount(response.data.companyCount);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteJob = async (
    jobId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.post(
        `/favorites-job/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // setFilteredJobs([...filteredJobs, response.data.data.job]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const retrieveFavoriteJobs = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.get(`/favorites-job/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const { data } = response.data.favoriteJobs;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jobsArray = data.map((item: any) => item.job);
        setFilteredJobs(jobsArray);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavoriteJob = async (
    jobId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.delete(`/favorites-job/${jobId}/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setFilteredJobs((prev) =>
      //   prev ? prev.filter((item) => item.id !== jobId) : []
      // );
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
        getJobsPagination,
        setJobsPagination,
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
        jobsCompanyCount,
        setJobsPaginationCompanyCount,
        retrieveJobsCount,
        modalType,
        setModalType,
        addFavoriteJob,
        retrieveFavoriteJobs,
        deleteFavoriteJob,
      }}
    >
      {children}
    </JobManagementContext.Provider>
  );
};

export { JobManagementProvider, JobManagementContext };
