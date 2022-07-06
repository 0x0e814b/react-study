import { useRef, useEffect, useCallback } from 'react';

export const useAutoScroll = (currentLength: number) => {
  const scrollRef = useRef(null);
  const lastLenCached = useRef(currentLength);
  const lastLen = lastLenCached.current;
  const scrollToBottom = useCallback(() => {
    const innerScroll = scrollRef.current as HTMLElement | null;
    if (innerScroll) {
      innerScroll.scrollTo(0, innerScroll.scrollHeight);
    }
  }, [scrollRef]);

  useEffect(() => {
    lastLenCached.current = currentLength;
    if (scrollRef && lastLen < currentLength) {
      scrollToBottom();
    }
  }, [currentLength]);

  return scrollRef;
};
