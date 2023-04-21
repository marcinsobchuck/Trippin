import { useTransition } from 'react-spring';

export const useModalAnimation = (key: boolean) => {
  const transition = useTransition(key, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    expires: true,
    config: {
      duration: 200,
    },
    delay: 100,
  });

  return transition;
};
