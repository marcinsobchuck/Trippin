import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useCombobox } from 'downshift';
import { useField } from 'formik';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import { ThreeDots } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';

import globeIcon from 'src/assets/images/globe.svg';
import planetEarthIcon from 'src/assets/images/planetEarthIcon.png';

import { useCodes } from 'src/apiServices/hooks/useCodes';
import { useLocations } from 'src/apiServices/hooks/useLocations';
import { Location } from 'src/apiServices/types/kiwiApi.types';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { Locations } from 'src/enums/locations.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { Button } from 'src/styles/Button.styled';

import {
  AnywhereItem,
  ErrorSpace,
  ErrorStyled,
  InputWrapper,
  PlaceInfoWrapper,
  StyledCountryName,
  StyledFlag,
  StyledGlobe,
  StyledIcon,
  StyledInput,
  StyledItem,
  StyledLabel,
  StyledLabelWrapper,
  StyledList,
} from './SearchFormInput.styled';
import { SearchFormInputProps } from './SearchFormInput.types';
import { convertLanguageCodes, getCurrentCodes, getLocationParameters } from './utils';

export const SearchFormInput: React.FC<SearchFormInputProps> = ({
  label,
  placeholder,
  className,
  type,
  isDestination,
  currentRecommendedPlace,
  error,
  ...props
}) => {
  const [currentCodes, setCurrentCodes] = useState<(string | undefined)[]>([]);
  const [place, setPlace] = useState<string>('');

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const { t } = useTranslation();

  const {
    regionalSettings: {
      language: { languageCode },
    },
  } = useAuth();

  const [field, meta, helpers] = useField(props);

  const { data: codesData } = useCodes(languageCode);
  const { data: locationsData, isLoading } = useLocations({
    term: place,
    limit: isTabletS ? 6 : 10,
    location_types: [Locations.Airport, Locations.City, Locations.Country],
    sort: 'name',
    locale: convertLanguageCodes(languageCode),
  });

  const codes = codesData?.data;
  const locations = locationsData?.data.locations;

  const loadOptions = (inputValue: string | undefined, selectedItem: Location | null | undefined) => {
    if (selectedItem && selectedItem.name === inputValue) {
      return;
    }

    if (inputValue && inputValue !== 'anywhere') {
      setPlace(inputValue);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLoadOptions = useCallback(debounce(loadOptions, 300), []);

  const { setValue } = helpers; // set Formik value

  const handleOnSelect = (selectedItem: Location) => {
    setValue({ id: selectedItem.id, text: selectedItem.name });
  };

  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    getLabelProps,
    getComboboxProps,
    isOpen,
    toggleMenu,
    highlightedIndex,
    setInputValue,
  } = useCombobox({
    items: locations || [],
    onInputValueChange: ({ inputValue, selectedItem }) => {
      debouncedLoadOptions(inputValue, selectedItem);
    },
    onSelectedItemChange: ({ selectedItem }) => (selectedItem ? handleOnSelect(selectedItem) : null),

    itemToString: (item) => (item ? item.name : ''),
  });

  const getCountryFlag = (index: number) =>
    currentCodes[index] !== undefined
      ? `https://flagcdn.com/24x18/${currentCodes[index]}.png`
      : planetEarthIcon;

  const handleClickAnywhere = () => {
    setInputValue(t('views.home.searchInput.anywhere'));
    setValue({ id: 'anywhere', text: 'anywhere' });
    toggleMenu();
  };

  useEffect(() => {
    if (!isDestination) {
      const getCurrentCity = () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!timezone) {
          return null;
        }
        const state = timezone.split('/')[1].replace('_', ' ');

        setPlace(state);
        return state;
      };

      getCurrentCity();
    }
  }, [isDestination, setInputValue]);

  useEffect(() => {
    if (codes && locations) {
      setCurrentCodes(getCurrentCodes(locations, codes));
    }
  }, [codes, locations]);

  useEffect(() => {
    if (currentRecommendedPlace) {
      setInputValue(currentRecommendedPlace?.inputText);
    }
  }, [currentRecommendedPlace, setInputValue]);

  useLockBodyScroll(!isTabletS && isOpen);

  return (
    <InputWrapper isFullscreen={!isTabletS && isOpen} {...getComboboxProps()}>
      <StyledLabelWrapper isFullscreen={!isTabletS && isOpen}>
        <StyledLabel {...getLabelProps()} isFullscreen={!isTabletS && isOpen}>
          {label}
          {isLoading && isOpen && (
            <ThreeDots
              color={!isTabletS && isOpen ? Colors.DarkerBlue : Colors.White}
              width={16}
              height={16}
              wrapperStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '6px',
              }}
            />
          )}
          {meta.error && meta.touched && error && !isOpen ? (
            <ErrorStyled>{t(error)}</ErrorStyled>
          ) : (
            <ErrorSpace>Error</ErrorSpace>
          )}
        </StyledLabel>
        {!isTabletS && isOpen && (
          <Button onClick={toggleMenu} variant="tertiary">
            Cancel
          </Button>
        )}
      </StyledLabelWrapper>
      <StyledInput
        {...field}
        {...getInputProps({
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === '') {
              setValue({ id: '', text: '' });
            }
          },
          onClick: () => toggleMenu(),
        })}
        isFullscreen={!isTabletS && isOpen}
        placeholder={placeholder}
      />
      <StyledList isFullscreen={!isTabletS && isOpen} {...getMenuProps()}>
        {isOpen &&
          !isLoading &&
          locations?.map((location, index) => (
            <StyledItem
              isFullscreen={!isTabletS && isOpen}
              {...getItemProps({
                key: `${location.id}${index}`,
                item: location,
                index,
                style: {
                  backgroundColor: highlightedIndex === index ? `${Colors.Silver}` : `${Colors.White}`,
                },
              })}
            >
              <StyledIcon src={getLocationParameters(location).icon} />
              <PlaceInfoWrapper>
                <p>{location.name}</p>
                {location.type !== Locations.Country && (
                  <StyledCountryName>{getLocationParameters(location).name}</StyledCountryName>
                )}
              </PlaceInfoWrapper>

              <StyledFlag src={getCountryFlag(index)} alt="country flag" />
            </StyledItem>
          ))}
        {isOpen && isDestination && (
          <AnywhereItem onClick={handleClickAnywhere}>
            <StyledGlobe src={globeIcon} />
            <div>
              <p>{t('views.home.searchInput.notDecided')}</p>
              <p>
                {t('views.home.searchInput.choose')}
                <span>{t('views.home.searchInput.anywhere')}</span>
              </p>
            </div>
          </AnywhereItem>
        )}
      </StyledList>
    </InputWrapper>
  );
};
