import { useTransition } from 'react-spring';

import { FavouriteFlight } from 'src/hooks/useFavourites';

export const useFavouritesTransitions = (data: FavouriteFlight[]) => {
  const transitionsDesktop = useTransition(data, {
    keys: (flight) => flight.id,
    trail: 100,
    from: {
      transform: 'translate3d(0px, -20px, 0px) scale(1)',
      opacity: 0,
      height: 0,
    },
    enter: (flight) => ({
      transform: 'translate3d(0px, 0px, 0px) scale(1)',
      opacity: 1,
      height: flight.duration.return > 0 ? 330 : 160,
    }),
    leave: {
      transform: 'translate3d(0px, 20px, 0px) scale(0)',
      opacity: 0,
      height: 0,
      marginBottom: 0,
    },
  });

  const transitionsMobile = useTransition(data, {
    keys: (flight) => flight.id,
    trail: 100,
    from: {
      transform: 'translate3d(0px, -20px, 0px) scale(1)',
      opacity: 0,
      height: 0,
    },
    enter: (flight) => ({
      transform: 'translate3d(0px, 0px, 0px) scale(1)',
      opacity: 1,
      height: flight.duration.return > 0 ? 600 : 310,
    }),
    leave: {
      transform: 'translate3d(0px, 20px, 0px) scale(0)',
      opacity: 0,
      height: 0,
      marginBottom: 0,
    },
  });
  return { transitionsDesktop, transitionsMobile };
};
