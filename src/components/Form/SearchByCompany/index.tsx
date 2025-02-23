import { DefaultButton } from "../../Buttons/DefaultButton";
import searchIcon from "../../../assets/search.svg";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchByCompanySchema } from "./searchCompanySchema";
import { useEffect, useState } from "react";

interface SearchByCompanyProps {
  companyName: string;
}
export const SearchByCompany = () => {
  const { register, handleSubmit } = useForm<SearchByCompanyProps>({
    resolver: zodResolver(SearchByCompanySchema),
    mode: "onChange",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("Empresa pesquisada:", searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const submit: SubmitHandler<SearchByCompanyProps> = (data) => {
    console.log("Empresa pesquisada:", data.companyName);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-[645px] w-full h-20 bg-white rounded-2xl flex justify-between"
    >
      <div className="w-full max-w-[402px] flex items-center">
        <input
          {...register("companyName")}
          type="text"
          placeholder="Digite o nome de uma empresa..."
          className="p-5 w-full outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="bg-gray-400 h-10 w-[1px]" />
      </div>
      <DefaultButton
        variant="brand1"
        size="small"
        text="Pesquisar"
        className="h-full w-full max-w-[168px] rounded-l-[0px]"
        icon={searchIcon}
        type="submit"
      />
    </form>
  );
};
