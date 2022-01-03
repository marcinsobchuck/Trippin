export interface SearchFormInitialValues {
  start: string;
  destination: string;
  date: {
    depart: string;
    return: string;
  };
  flightType: "round" | "oneway";
}
