import data from "../../../motivating.json";
import './style.css'
import { useQuoteRefresher } from "../../hooks/useQuoteRefresher";
export const MotivatingCard = () => {
  const { quote, author } = useQuoteRefresher(data);
  return (
    <div className="flex-1 w-full h-[200px] bg-white-10 rounded-[4px] custom-shadow-40 flex flex-col p-5 justify-between">
      <h3 className="text-white font-semibold lg:text-[20px] md:text-1 text-2 text-justify md:leading-7 leading-5 h-full max-h-[85px]">{`"${quote}"`}</h3>
      <span className="text-brand-2 font-semibold text-2 md:text-1 lg:text-[20px] text-end">
        {`- ${author}`}
      </span>
    </div>
  );
};
