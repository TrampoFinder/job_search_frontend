import { DefaultJobApplicationForm } from "../../Form/DefaultJobApplicationForm";

export const ModalApplyJob = () => {
  return (
    <>
      <h3 className="text-2xl leading-tight font-bold text-brand-2 text-center">
        Deseja modificar o status da candidatura?
      </h3>
      <DefaultJobApplicationForm />
    </>
  );
};
