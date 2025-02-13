import { RadioCustom } from "./RadioCustom";

export const SearchByDateForm = () => {
  const handleFilterChange = (filter: string) => {
    console.log(filter);
  };
  return (
    <div className="flex flex-col gap-3">
      <RadioCustom
        text="Todas as vagas"
        quantity={10}
        onChange={handleFilterChange}
      />
      <RadioCustom
        text="Última hora"
        quantity={10}
        onChange={handleFilterChange}
      />
      <RadioCustom
        text="Últimas 24 horas"
        quantity={10}
        onChange={handleFilterChange}
      />
      <RadioCustom
        text="Últimos 7 dias"
        quantity={10}
        onChange={handleFilterChange}
      />
      <RadioCustom
        text="Últimos 30 dias"
        quantity={10}
        onChange={handleFilterChange}
      />
    </div>
  );
};
