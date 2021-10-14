import { useQuery } from "react-query";
import { getCodes } from "../flagsApi";

export const useCodes = () => {
  const fetchCodes = useQuery("flags", () => getCodes(), {
    refetchOnWindowFocus: false,
  });

  return fetchCodes;
};
