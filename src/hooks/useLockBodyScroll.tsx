import { useLayoutEffect } from 'react';

export const useLockBodyScroll = (condition: boolean) => {
  useLayoutEffect((): (() => void) => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (condition) document.body.style.overflow = 'hidden';

    // eslint-disable-next-line no-return-assign
    return () => (document.body.style.overflow = originalStyle);
  }, [condition]);
};
