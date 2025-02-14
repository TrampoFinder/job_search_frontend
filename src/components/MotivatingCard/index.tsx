/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import data from "../../../motivating.json";
import { useLocation } from "react-router-dom";
export const MotivatingCard = () => {
  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  };
  const { quote, author } = randomQuote();
  const location = useLocation();
  const [authorMessage, setAuthorMessage] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");

  useEffect(() => {
    setAuthorMessage(author);
    setQuoteMessage(quote);
  }, [location]);
  return (
    <div className="w-full max-w-[512px] h-[200px] bg-white-10 rounded-[8px] custom-shadow-40 flex flex-col p-5">
      <h3 className="text-white font-semibold text-[20px] text-justify leading-7 h-full max-h-[85px]">{`"${quoteMessage}"`}</h3>
      <span className="text-brand-2 font-semibold text-1 text-end">
        {`- ${authorMessage}`}
      </span>
    </div>
  );
};
