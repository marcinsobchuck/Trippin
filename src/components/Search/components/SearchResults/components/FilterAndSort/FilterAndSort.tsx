import React, { useState } from "react";
import { Flight, SearchParameters } from "src/apiServices/types/kiwiApi.types";
import { PriceRangeSlider } from "./components/PriceRangeSlider";
import { SortSelect } from "./components/SortSelect";
import {
  Arrow,
  ButtonWrapper,
  FilterWrapper,
  Wrapper,
} from "./FilterAndSort.styled";
import arrow from "src/assets/images/arrow.svg";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { useSearchContext } from "src/components/Search/hooks/useSearchContext";
import { SearchActions } from "src/components/Search/reducer/enums/searchActions.enum";
import { useSearchResults } from "src/apiServices/hooks/useSearchResults";

interface FilterAndSortProps {
  flightsData: Flight[];
  setShowSortAndFilter: (x: boolean) => void;
  paramsNotEqual: boolean;
  parameters: SearchParameters;
}

export const FilterAndSort: React.FC<FilterAndSortProps> = ({
  flightsData,
  setShowSortAndFilter,
  paramsNotEqual,
  parameters,
}) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [, dispatch] = useSearchContext();

  const handleHideSortAndFilter = () => {
    setShowSortAndFilter(false);
  };

  const { isFetching } = useSearchResults(parameters);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev);
    dispatch({
      type: SearchActions.SET_DIRECT_ONLY,
      payload: e.currentTarget.checked ? 0 : undefined,
    });
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <PriceRangeSlider
          parameters={parameters}
          flightsData={flightsData}
          paramsNotEqual={paramsNotEqual}
        />

        <Checkbox
          label='Direct only'
          onChange={handleCheckboxChange}
          checked={checked}
          disabled={isFetching}
        />
      </FilterWrapper>

      <SortSelect />

      <ButtonWrapper onClick={handleHideSortAndFilter}>
        <Arrow src={arrow} />
      </ButtonWrapper>
    </Wrapper>
  );
};
