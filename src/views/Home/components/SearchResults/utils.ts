import moment from 'moment';

export const formatTime = (date: number) => moment.unix(date).utcOffset(0).format('HH:mm');

export const formatDate = (date: number) => moment.unix(date).utcOffset(0).format('DD.MM.YY');

export const getDateDifference = (past: number, future: number) => {
  const departureDate = moment.unix(past);
  const arrivalDate = moment.unix(future);

  const differenceMS = arrivalDate.diff(departureDate);
  const hours = Math.trunc(moment.duration(differenceMS).asHours());
  const minutes = moment.duration(differenceMS).minutes();

  const result = `${hours}h  ${minutes}min`;

  return result;
};
