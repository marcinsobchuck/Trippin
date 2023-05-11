import * as Yup from 'yup';

export const searchSchema = Yup.object().shape({
  start: Yup.object({
    id: Yup.string().required('views.home.errors.required'),
  }),
  date: Yup.object().when('flightType', {
    is: 'round',
    then: Yup.object({
      inbound: Yup.string().required('views.home.errors.required'),
      outbound: Yup.string().required('views.home.errors.required'),
    }),
    otherwise: Yup.object({
      inbound: Yup.string().required('views.home.errors.required'),
    }),
  }),
});
