/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { JobManagementContext } from "../../../contexts/JobContext";
import { CardJob } from "./CardJob";

export const ListJobs = () => {
  const { getJobsPagination, retrieveJobs, filteredJobs } =
    useContext(JobManagementContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        await retrieveJobs(1, setLoading);
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
  // const jobsToRender =
  //   filteredJobs && filteredJobs.length > 0 ? filteredJobs : [];
  const jobsToRender =
    filteredJobs !== null && filteredJobs !== undefined
      ? filteredJobs
      : getJobsPagination?.data || [];

  return (
    <ul className="h-full w-full flex flex-col gap-6">
      {loading ? (
        <span>Loading...</span>
      ) : (
        jobsToRender.map((job, index) => (
          <CardJob key={job.id ?? `fallback-key-${index}`} {...job} />
        ))
      )}
    </ul>
  );
};
