import { RefObject, useEffect } from "react";

type EventType = MouseEvent | TouchEvent;

export const useOutClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: EventType) => void
) => {
  useEffect(() => {
    const eventListener = (event: EventType) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", eventListener);
    document.addEventListener("touchstart", eventListener);

    return () => {
      document.removeEventListener("mousedown", eventListener);
      document.removeEventListener("touchstart", eventListener);
    };
  }, [ref, handler]);
};
