import { useState } from 'react';

import { useSpring, useTransition } from 'react-spring';

export const useAnimations = () => {
  const [toggleMobileAnimation, setToggleMobileAnimation] = useState<boolean>(true);
  const [toggleDesktopAnimation, setToggleDesktopAnimation] = useState<boolean>(true);

  const handleToggleMobileAnimation = () => setToggleMobileAnimation((prev) => !prev);
  const handleToggleDesktopAnimation = () => setToggleDesktopAnimation((prev) => !prev);
  // Mobile
  const mobileTransition = useTransition(toggleMobileAnimation, {
    from: { x: 0, y: 600, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: {
      position: 'fixed',
      width: '380px',
      x: 1000,
      y: 0,
      opacity: 0,
    },
    config: {
      duration: 600,
    },
  });

  // Desktop
  const sideActionAnimation = useSpring({
    from: {
      width: '40%',
    },
    to: {
      position: 'absolute',
      left: toggleDesktopAnimation ? '60%' : '0%',
    },

    delay: 400,
    config: {
      duration: 450,
    },
  });

  const headingLoginTransition = useTransition(toggleDesktopAnimation, {
    from: { opacity: 0, x: 300, y: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    leave: {
      position: 'absolute',
      x: 300,
      y: 0,
      opacity: 0,
    },
    delay: toggleDesktopAnimation ? 500 : 0,
  });

  const headingSignUpTransition = useTransition(toggleDesktopAnimation, {
    from: { opacity: 0, x: -300, y: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    leave: {
      position: 'absolute',
      x: -300,
      y: 0,
      opacity: 0,
    },
    delay: toggleDesktopAnimation ? 0 : 500,
  });

  const buttonsTransition = useTransition(toggleDesktopAnimation, {
    from: { opacity: 0, x: 0, y: 500 },
    enter: {
      position: 'absolute',
      opacity: 1,
      y: 325,
    },
    leave: { opacity: 0, x: 0, y: 400 },
    delay: 1000,
  });

  const formAnimation = useSpring({
    from: {
      width: '60%',
    },
    to: {
      position: 'absolute',
      left: toggleDesktopAnimation ? '0%' : '40%',
    },

    delay: 400,
    config: {
      duration: 450,
    },
  });

  const formTransition = useTransition(toggleDesktopAnimation, {
    from: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    leave: {
      position: 'absolute',
      x: 0,
      y: 0,
      opacity: 0,
    },
    delay: 550,
    config: {
      duration: 100,
    },
  });

  const logoTransition = useTransition(toggleDesktopAnimation, {
    from: {
      opacity: 0,
      x: 20,
      y: 20,
    },
    enter: {
      position: 'absolute',
      opacity: 1,
      zIndex: 2,
      x: 20,
      y: 20,
    },
    leave: {
      opacity: 0,
      x: 20,
      y: 20,
    },
    delay: toggleDesktopAnimation ? 400 : 800,
    config: {
      duration: 100,
    },
  });

  return {
    mobileTransition,
    handleToggleMobileAnimation,
    sideActionAnimation,
    headingLoginTransition,
    headingSignUpTransition,
    buttonsTransition,
    formAnimation,
    formTransition,
    logoTransition,
    handleToggleDesktopAnimation,
  };
};
