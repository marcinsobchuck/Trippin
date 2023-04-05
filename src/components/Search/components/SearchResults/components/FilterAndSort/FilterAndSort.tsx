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
import { useSearchResults } from "src/apiServices/hooks/useSearchResults";
import { setDirectOnly } from "src/components/Search/reducer/actions/search.actions";

interface FilterAndSortProps {
  setShowSortAndFilter: (x: boolean) => void;
  parameters: SearchParameters;
}

export const FilterAndSort: React.FC<FilterAndSortProps> = ({
  setShowSortAndFilter,
  parameters,
}) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [
    {
      searchFormData: {
        start: { id: startId },
      },
    },
    dispatch,
  ] = useSearchContext();

  const handleHideSortAndFilter = () => {
    setShowSortAndFilter(false);
  };

  const { isLoading } = useSearchResults(parameters);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev);
    setDirectOnly(dispatch, e.currentTarget.checked ? 0 : undefined);
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <PriceRangeSlider parameters={parameters} />

        <Checkbox
          label='Direct only'
          onChange={handleCheckboxChange}
          checked={checked}
          disabled={isLoading}
        />
      </FilterWrapper>

      <SortSelect />

      <ButtonWrapper onClick={handleHideSortAndFilter}>
        <Arrow src={arrow} />
      </ButtonWrapper>
    </Wrapper>
  );
};
