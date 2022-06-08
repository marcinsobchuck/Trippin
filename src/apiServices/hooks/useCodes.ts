import { useQuery } from "react-query";
import { getCodes } from "../flagsApi";

export const useCodes = (language: "pl" | "en") => {
  const fetchCodes = useQuery("flags", () => getCodes(language), {
    refetchOnWindowFocus: false,
  });

  return fetchCodes;
};
