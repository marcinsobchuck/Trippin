import moment from "moment";

export const formatDateToLocalTime = (date: number) =>
  moment.unix(date).local().format("HH:mm");

export const formatDateToLocalDate = (date: number) =>
  moment.unix(date).local().format("DD.MM.YY");

export const getDateDifference = (past: number, future: number) => {
  const departureDate = moment.unix(past);
  const arrivalDate = moment.unix(future);

  const differenceMS = arrivalDate.diff(departureDate);
  const hours = Math.trunc(moment.duration(differenceMS).asHours());
  const minutes = moment.duration(differenceMS).minutes();

  const result = `${hours}h  ${minutes}min`;

  return result;
};
