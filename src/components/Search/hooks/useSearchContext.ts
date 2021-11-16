import { useContext } from "react";
import { SearchContext } from "../context/search.context";

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext can be used only inside of SearchContext.Provider"
    );
  }
  return context;
};
