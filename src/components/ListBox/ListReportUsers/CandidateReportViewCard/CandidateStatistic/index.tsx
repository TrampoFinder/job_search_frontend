interface CandidateStatisticProps {
  text: string;
  value: string;
}

export const CandidateStatistic = ({
  text,
  value,
}: CandidateStatisticProps) => {
  return (
    <li className="w-full space-y-4">
      <div className="bg-brand-2/10 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">{text}</span>
          <span className="font-semibold">{`${value}%`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-brand-2 h-2.5 rounded-full"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </li>
  );
};
