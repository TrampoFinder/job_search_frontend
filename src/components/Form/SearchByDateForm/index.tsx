import { useContext, useState } from "react";
import { CheckboxCustom } from "./CheckboxCustom";
import { JobManagementContext } from "../../../contexts/JobContext";

export const SearchByDateForm = () => {
  const { getJobs, filterByTime, setFilteredJobs } =
    useContext(JobManagementContext);
  const [selectValues, setSelectValues] = useState<string[]>([]);
  const jobs = getJobs?.jobs || [];
  const handleFilterChange = (filter: string, isChecked: boolean) => {
    const newValues = isChecked
      ? [...selectValues, filter]
      : selectValues.filter((f) => f !== filter);
    setSelectValues(newValues);
    setFilteredJobs(filterByTime(jobs, newValues));
  };
  return (
    <div className="flex flex-col gap-3">
      <CheckboxCustom
        text="Todas as vagas"
        value="todas_as_vagas"
        checked={selectValues.includes("todas_as_vagas")}
        quantity={10}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Última hora"
        value="ultima_hora"
        quantity={10}
        checked={selectValues.includes("ultima_hora")}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Últimas 24 horas"
        value="ultimas_24_horas"
        quantity={10}
        checked={selectValues.includes("ultimas_24_horas")}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Últimos 7 dias"
        value="ultimos_7_dias"
        quantity={10}
        checked={selectValues.includes("ultimos_7_dias")}
        onChange={handleFilterChange}
      />
      <CheckboxCustom
        text="Últimos 30 dias"
        value="ultimos_30_dias"
        quantity={10}
        checked={selectValues.includes("ultimos_30_dias")}
        onChange={handleFilterChange}
      />
    </div>
  );
};
