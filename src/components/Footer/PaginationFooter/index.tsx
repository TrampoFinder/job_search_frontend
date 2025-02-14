import { useContext } from "react";
import { JobManagementContext } from "../../../contexts/JobContext";
import { Button } from "../../Button";

export const PaginationFooter = () => {
  const { getJobs } = useContext(JobManagementContext);
  return (
    <div className="flex justify-between items-center">
      <Button
        type="button"
        text="<"
        variant="outlinebrand1"
        size="small"
        className="border-gray-400 text-gray-500 hover:border-brand-1 max-w-[50px] font-semibold"
      />
      <div className="flex gap-6">
        <Button
          type="button"
          text="1"
          variant="brand1"
          size="small"
          className="border-gray-400 text-gray-500 hover:border-brand-1 w-[40px] h-[40px] font-semibold"
        />
      </div>
      <Button
        type="button"
        text=">"
        variant="outlinebrand1"
        size="small"
        className="border-gray-400 text-gray-500 hover:border-brand-1 max-w-[50px] font-semibold"
      />
    </div>
  );
};
