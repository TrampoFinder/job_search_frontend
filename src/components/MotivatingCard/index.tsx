/* eslint-disable react-hooks/exhaustive-deps */
import data from "../../../motivating.json";
import { useQuoteRefresher } from "../../hooks/useQuoteRefresher";
export const MotivatingCard = () => {
  const { quote, author } = useQuoteRefresher(data);
  return (
    <div className="w-full max-w-[512px] h-[200px] bg-white-10 rounded-[8px] custom-shadow-40 flex flex-col p-5">
      <h3 className="text-white font-semibold text-[20px] text-justify leading-7 h-full max-h-[85px]">{`"${quote}"`}</h3>
      <span className="text-brand-2 font-semibold text-1 text-end">
        {`- ${author}`}
      </span>
    </div>
  );
};
