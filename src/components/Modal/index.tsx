import { useContext, useRef } from "react";
import { JobManagementContext } from "../../contexts/JobContext";
import { useOutClick } from "../../hooks/useOutClick";
import { ModalFactory } from "./ModalFactory";

export const ModalWrapper = () => {
  const { setIsModalOpen } = useContext(JobManagementContext);
  const close = useRef(null);
  useOutClick(close, () => setIsModalOpen(false));
  return (
    <div className="w-screen h-screen bg-black/70 flex items-center justify-center fixed z-10 backdrop-blur-sm">
      <div
        className="max-w-[532px] w-full  bg-black/50 rounded-1 custom-shadow-80 pl-11 pr-11 pt-7 pb-7 flex flex-col gap-[22px]"
        ref={close}
      >
        <ModalFactory />
      </div>
    </div>
  );
};
