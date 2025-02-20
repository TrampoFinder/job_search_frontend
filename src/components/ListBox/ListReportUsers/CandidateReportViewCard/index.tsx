import user from "../../../../assets/user.svg";
import { CandidateStatistic } from "./CandidateStatistic";
interface CandidateReportCardProps {
  fullName: string;
  notProcessing: string;
  applied: string;
  inProgress: string;
  approved: string;
  rejected: string;
  closed: string;
}
export const CandidateReportViewCard = ({
  fullName,
  notProcessing,
  applied,
  inProgress,
  approved,
  rejected,
  closed,
}: CandidateReportCardProps) => {
  return (
    <li
      className="w-full max-w-[306px] rounded-[20px] custom-shadow hover:scale-[102%] transition-transform duration-300 ease-out gap-6 flex flex-col justify-center items-center pt-8 pb-5 pl-1.5 pr-1.5 animate-opacity"
      key={fullName}
    >
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex items-center justify-center bg-brand-1 w-[60px] h-[60px] rounded-[8px]">
          <img src={user} alt="User" />
        </div>
        <h3 className="font-semibold text-2xl text-center">{fullName}</h3>
        <ul className="flex flex-col gap-2.5 items-center w-full p-3">
          <CandidateStatistic
            text="Vagas não elegíveis"
            value={notProcessing}
          />
          <CandidateStatistic text="Vagas aplicadas" value={applied} />
          <CandidateStatistic text="Vagas em processo" value={inProgress} />
          <CandidateStatistic text="Vagas aprovadas" value={approved} />
          <CandidateStatistic text="Vagas reprovadas" value={rejected} />
          <CandidateStatistic text="Vagas fechadas" value={closed} />
        </ul>
      </div>
    </li>
  );
};
