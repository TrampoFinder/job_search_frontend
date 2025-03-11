import { DefaultJobApplicationForm } from "../../Form/DefaultJobApplicationForm";

export const ModalCandidateJob = () => {
  return (
    <>
      <h3 className="text-2xl leading-tight font-bold text-brand-2 text-center">
        Deseja candidatar-se a vaga?
      </h3>
      <span className="text-white">
        Antes de se candidatar, avalie os detalhes da vaga e veja se ela se
        alinha aos seus objetivos profissionais.
      </span>
      <DefaultJobApplicationForm />
    </>
  );
};
