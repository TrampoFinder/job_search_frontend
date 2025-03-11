import { useContext } from "react";
import { JobManagementContext } from "../../../contexts/JobContext";
import { ModalApplyJob } from "../ModalApplyJob";
import { ModalCandidateJob } from "../ModalCandidateJob";
import { ModalEditProfile } from "../ModalEditProfile";

export interface ModalContetType {
  type: "applyJob" | "editProfile" | "changeStatusApplicationJob";
}
export const ModalFactory = () => {
  const { modalType } = useContext(JobManagementContext);
  switch (modalType) {
    case "applyJob":
      return <ModalCandidateJob />;
    case "editProfile":
      return <ModalEditProfile />;
    case "changeStatusApplicationJob":
      return <ModalApplyJob />;
    default:
      break;
  }
};
