import { useContext, useEffect, useState } from "react";
import { JobManagementContext } from "../../../contexts/JobContext";
import { CardApplicationJob } from "./CardApplicationJob";

export const ListApplicationJobs = () => {
  const { applicationHistory, applicationJobs } =
    useContext(JobManagementContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApplicationJobs = async () => {
      setLoading(true);
      try {
        await applicationHistory(1, setLoading);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="h-full w-full flex flex-col gap-6">
      {applicationJobs?.data.map((applicationJob) => (
        <CardApplicationJob
          key={applicationJob.id}
          id={applicationJob.id}
          jobId={applicationJob.jobId}
          userId={applicationJob.userId}
          title={applicationJob.title}
          status={applicationJob.status}
          note={applicationJob.note}
          url={applicationJob.url}
        />
      ))}
    </ul>
  );
};
