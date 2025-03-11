import { useState, useEffect } from "react";

export const useQuoteRefresher = (
  data: { quote: string; author: string }[]
) => {
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  };

  const loadQuoteFromStorage = () => {
    const storedQuote = localStorage.getItem("quoteData");
    const storedTime = localStorage.getItem("quoteTimestamp");

    if (storedQuote && storedTime) {
      const elapsedTime = Date.now() - parseInt(storedTime, 10);

      if (elapsedTime > 30 * 60 * 1000) {
        return getRandomQuote();
      } else {
        return JSON.parse(storedQuote);
      }
    }

    return getRandomQuote();
  };

  const [quoteData, setQuoteData] = useState(loadQuoteFromStorage);

  useEffect(() => {
    localStorage.setItem("quoteData", JSON.stringify(quoteData));
    localStorage.setItem("quoteTimestamp", Date.now().toString());

    const interval = setInterval(() => {
      const newQuote = getRandomQuote();
      setQuoteData(newQuote);
      localStorage.setItem("quoteData", JSON.stringify(newQuote));
      localStorage.setItem("quoteTimestamp", Date.now().toString());
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [quoteData]);

  return quoteData;
};
