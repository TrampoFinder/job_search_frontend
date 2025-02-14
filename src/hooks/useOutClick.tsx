/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export const useOutClick = (ref: any, handler: any) => {
  useEffect(() => {
    const eventListener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [ref, handler]);
};
