import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { Checkbox } from 'src/components/Checkbox/Checkbox';
import { Colors } from 'src/enums/colors.enum';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';
import { setDirectOnly } from 'src/views/Home/reducer/actions/search.actions';

import { PriceRangeSlider } from '../PriceRangeSlider/PriceRangeSlider';
import { SortSelect } from '../SortSelect/SortSelect';

import { ButtonWrapper, FilterWrapper, StyledIcon, Wrapper } from './FilterAndSort.styled';
import { FilterAndSortProps } from './FilterAndSort.types';

export const FilterAndSort: React.FC<FilterAndSortProps> = ({
  showSortSortAndFilter,
  setShowSortAndFilter,
  parameters,
}) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [, dispatch] = useSearchContext();

  const handleShowSortAndFilter = () => {
    setShowSortAndFilter((prev) => !prev);
  };

  const { isLoading } = useSearchResults(parameters);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev);
    setDirectOnly(dispatch, e.currentTarget.checked ? 0 : undefined);
  };

  const { t } = useTranslation();

  return (
    <Wrapper isOpen={showSortSortAndFilter}>
      <FilterWrapper>
        <PriceRangeSlider parameters={parameters} />

        <Checkbox
          label={t('views.home.labels.directOnly')}
          onChange={handleCheckboxChange}
          checked={checked}
          disabled={isLoading}
        />
      </FilterWrapper>

      <SortSelect />

      <ButtonWrapper onClick={handleShowSortAndFilter}>
        <StyledIcon
          isOpen={showSortSortAndFilter}
          name={showSortSortAndFilter ? 'arrowIcon' : 'sortFilterIcon'}
          width={18}
          height={18}
          color={Colors.White}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
