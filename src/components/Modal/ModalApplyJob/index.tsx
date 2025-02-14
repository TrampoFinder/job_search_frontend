/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useRef } from "react";
import { useOutClick } from "../../../hooks/useOutClick";
import { JobManagementContext } from "../../../contexts/JobContext";
import { ModifyStatusJobApplyForm } from "../../Form/ModifyStatusJobApplyForm";

export const ModalApplyJob = () => {
  const { setIsModalOpen } = useContext(JobManagementContext);
  const close: any = useRef();
  useOutClick(close, () => setIsModalOpen(false));
  return (
    <div
      className="w-screen h-screen bg-black/70 flex items-center justify-center fixed z-10 backdrop-blur-sm"
      ref={close}
    >
      <div className="max-w-[532px] w-full  bg-black/50 rounded-2xl custom-shadow-80 pl-11 pr-11 pt-7 pb-7 flex flex-col gap-[22px]">
        <h3 className="text-2xl leading-tight font-bold text-brand-2 text-center">
          Deseja modificar o status da candidatura?
        </h3>
        <ModifyStatusJobApplyForm />
      </div>
    </div>
  );
};
