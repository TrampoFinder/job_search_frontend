import { useContext, useEffect, useState } from "react";
import { JobManagementContext } from "../../../contexts/JobContext";
import { CardJob } from "./CardJob";

export const ListJobs = () => {
  const { getJobsPagination, retrieveJobs, filteredJobs } =
    useContext(JobManagementContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        await retrieveJobs(setLoading);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    if (!loading) {
      fetchJobs();
    }
  }, []);
  return (
    <ul className="h-full w-full flex flex-col gap-6">
      {loading ? (
        <span>Loading...</span>
      ) : filteredJobs ? (
        filteredJobs.map((job) => (
          <CardJob
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            status={job.status}
            location={job.location}
            createdAt={job.createdAt}
            url={job.url}
          />
        ))
      ) : (
        getJobsPagination?.data.map((job) => (
          <CardJob
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            status={job.status}
            location={job.location}
            createdAt={job.createdAt}
            url={job.url}
          />
        ))
      )}
    </ul>
  );
};
