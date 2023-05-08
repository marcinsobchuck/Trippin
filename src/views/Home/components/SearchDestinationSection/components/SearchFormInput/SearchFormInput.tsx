import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useCombobox } from 'downshift';
import { useField } from 'formik';
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
import { LocationsType } from 'src/enums/locationsType.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { Button } from 'src/styles/Button.styled';

import {
  AnywhereItem,
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
import { convertLanguageCodes, getLocationParameters } from './utils';

export const SearchFormInput: React.FC<SearchFormInputProps> = ({
  label,
  placeholder,
  className,
  type,
  isDestination,
  currentRecommendedPlace,
  ...props
}) => {
  const [currentCodes, setCurrentCodes] = useState<string[]>([]);
  const [place, setPlace] = useState<string>('');

  const {
    regionalSettings: {
      language: { languageCode },
    },
  } = useAuth();
  const [field, , helpers] = useField(props);

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const { t } = useTranslation();

  const { data: codes } = useCodes(languageCode);
  const { data, isLoading } = useLocations({
    term: place,
    limit: isTabletS ? 6 : 10,
    location_types: ['airport', 'city', 'country'],
    sort: 'name',
    locale: convertLanguageCodes(languageCode),
  });

  const loadOptions = (inputValue: string | undefined, selectedItem: Location | null | undefined) => {
    if (selectedItem && selectedItem.name === inputValue) {
      return;
    }

    if (inputValue && inputValue !== 'anywhere') {
      setPlace(inputValue);
    }
  };

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
    inputValue,
    setInputValue,
  } = useCombobox({
    items: data?.data.locations ? data?.data.locations : [],
    onInputValueChange: ({ inputValue, selectedItem }) => {
      loadOptions(inputValue, selectedItem);
    },
    onSelectedItemChange: ({ selectedItem }) => (selectedItem ? handleOnSelect(selectedItem) : null),

    itemToString: (item) => (item ? item.name : ''),
  });

  const getCurrentCountryCodes = useCallback(() => {
    if (codes?.data && data?.data.locations) {
      const currentCountriesArray = data?.data.locations.map(
        (location) => getLocationParameters(location).name,
      );
      const countriesData = Object.entries(codes.data);
      const countries = Object.values(codes.data);
      const currentCodes: string[] = [];
      currentCountriesArray.forEach((el, index) => {
        if (!countries.includes(el)) {
          currentCodes[index] = 'unindentified';
        }
        countriesData.forEach((item) => {
          if (item[1] === el) {
            currentCodes.push(item[0]);
          }
        });
      });
      setCurrentCodes(currentCodes);
    }
  }, [codes?.data, data?.data.locations]);

  const getCountryFlag = (index: number) =>
    currentCodes[index] !== 'unindentified'
      ? `https://flagcdn.com/24x18/${currentCodes[index]}.png`
      : planetEarthIcon;

  const handleClickAnywhere = () => {
    setInputValue(t('views.home.searchInput.anywhere'));
    setValue({ id: 'anywhere', text: 'anywhere' });
    toggleMenu();
  };

  useEffect(() => {
    if (data?.data.locations) {
      getCurrentCountryCodes();
    }
  }, [data?.data.locations, getCurrentCountryCodes]);

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
        })}
        isFullscreen={!isTabletS && isOpen}
        placeholder={placeholder}
      />

      <StyledList isFullscreen={!isTabletS && isOpen} {...getMenuProps()}>
        {isOpen &&
          !isLoading &&
          inputValue !== '' &&
          data?.data.locations.map((location, index) => (
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
                {location.type !== LocationsType.Country && (
                  <StyledCountryName>{getLocationParameters(location).name}</StyledCountryName>
                )}
              </PlaceInfoWrapper>

              <StyledFlag src={getCountryFlag(index)} alt="country flag" />
            </StyledItem>
          ))}
        {isOpen && inputValue !== '' && isDestination && (
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
