import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateJobApplicationSchema } from "./updateJobApplicationSchema";
import chevronDrown from "../../../assets/chevron-down.svg";
import { Button } from "../../Button";
import { JobManagementContext } from "../../../contexts/JobContext";

interface UpdateJobApplicationProps {
  note: string;
  status:
    | "NOT_PROCESSING"
    | "APPLIED"
    | "IN_PROGRESS"
    | "APPROVED"
    | "REJECTED"
    | "CLOSED";
}
export const ModifyStatusJobApplyForm = () => {
  const [loading, setLoading] = useState(false);
  const { setIsModalOpen, setJob, job, jobApplication } =
    useContext(JobManagementContext);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UpdateJobApplicationProps>({
    mode: "onBlur",
    resolver: zodResolver(UpdateJobApplicationSchema),
  });
  const submit: SubmitHandler<UpdateJobApplicationProps> = async (data) => {
    const updatedJob = { ...job, ...data };
    setJob(updatedJob);
    await jobApplication(updatedJob, setLoading);
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-[34px]">
      <label
        htmlFor="status_job_application"
        className="flex flex-col text-white"
      >
        Alterar status da candidatura:
        <div className="text-3 text-gray px-4 h-[40px] w-full border-[1.5px] border-gray-200 rounded-[8px] placeholder-gray mt-2.5 relative flex justify-between">
          <select
            id="status_job_application"
            {...register("status")}
            className="outline-none appearance-none text-gray w-full h-[40px]"
            disabled={loading}
          >
            <option value="">Selecione um status</option>
            <option value="NOT_PROCESSING">Não elegível</option>
            <option value="APPLIED">Aplicado</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="APPROVED">Aprovado</option>
            <option value="REJECTED">Rejeitado</option>
            <option value="CLOSED">Encerrado</option>
          </select>
          <img
            src={chevronDrown}
            alt="Arrow down"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </label>
      <label
        htmlFor="note_job_application"
        className="flex flex-col text-white"
      >
        Observações de candidatura:
        <textarea
          id="note_job_application"
          {...register("note")}
          placeholder="Digite sua observação..."
          className="border-[1.5px] border-gray-200 rounded-[8px] w-full h-[100px] px-4 mt-2.5 outline-none p-1.5 resize-none overflow-hidden"
          disabled={loading}
        />
      </label>
      <div className="flex w-full gap-[33px] items-center justify-center">
        <Button
          variant="outlinebrand1"
          text="Fechar"
          size="medium"
          onClick={() => setIsModalOpen(false)}
        />
        <Button
          variant="brand1"
          text="Confirmar"
          size="medium"
          type="submit"
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
