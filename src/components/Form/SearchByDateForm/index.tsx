import { useContext, useState } from "react";
import { CheckboxCustom } from "./CheckboxCustom";
import { JobManagementContext } from "../../../contexts/JobContext";

export const SearchByDateForm = () => {
  const { getJobsPagination, filterByTime, setFilteredJobs } =
    useContext(JobManagementContext);
  const [selectValues, setSelectValues] = useState<string | null>(null);
  const jobs = getJobsPagination?.data || [];
  const handleFilterChange = (filter: string, isChecked: boolean) => {
    const newValue = isChecked ? filter : null;
    setSelectValues(newValue);
    if (newValue === "todas_as_vagas") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(filterByTime(jobs, newValue ? [newValue] : []));
    }
  };
   const countJobsByFilter = (filter: string) => {
    return filterByTime(jobs, [filter]).length;
  };
  
  return (
    <div className="flex flex-col gap-3">
      <CheckboxCustom
        text="Todas as vagas"
        value="todas_as_vagas"
        checked={selectValues === "todas_as_vagas"}
        quantity={jobs.length}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Última hora"
        value="ultima_hora"
        quantity={countJobsByFilter('ultima_hora')}
        checked={selectValues === "ultima_hora"}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Últimas 24 horas"
        value="ultimas_24_horas"
        quantity={countJobsByFilter('ultimas_24_horas')}
        checked={selectValues === "ultimas_24_horas"}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Últimos 7 dias"
        value="ultimos_7_dias"
        quantity={countJobsByFilter('ultimos_7_dias')}
        checked={selectValues === "ultimos_7_dias"}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Últimos 30 dias"
        value="ultimos_30_dias"
        quantity={countJobsByFilter('ultimos_30_dias')}
        checked={selectValues === "ultimos_30_dias"}
        onChange={handleFilterChange}
      />
    </div>
  );
};
