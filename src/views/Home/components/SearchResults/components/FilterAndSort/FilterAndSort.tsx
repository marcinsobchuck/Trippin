import React, { useState } from 'react';

import arrow from 'src/assets/images/arrow.svg';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { Checkbox } from 'src/components/Checkbox/Checkbox';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';
import { setDirectOnly } from 'src/views/Home/reducer/actions/search.actions';

import { PriceRangeSlider } from '../PriceRangeSlider/PriceRangeSlider';
import { SortSelect } from '../SortSelect/SortSelect';

import { Arrow, ButtonWrapper, FilterWrapper, Wrapper } from './FilterAndSort.styled';
import { FilterAndSortProps } from './FilterAndSort.types';

export const FilterAndSort: React.FC<FilterAndSortProps> = ({ setShowSortAndFilter, parameters }) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [, dispatch] = useSearchContext();

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
          label="Direct only"
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
