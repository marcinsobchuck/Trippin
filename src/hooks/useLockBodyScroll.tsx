import { useLayoutEffect } from 'react';

export const useLockBodyScroll = (condition: boolean) => {
  useLayoutEffect((): (() => void) => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (condition) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [condition]);
};
