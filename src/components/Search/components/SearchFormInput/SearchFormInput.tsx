import React, { useEffect, useState, useCallback } from "react";
import { useCombobox } from "downshift";
import { useField } from "formik";
import { SearchFormInputProps } from "./SearchFormInput.types";
import { useLocations } from "src/apiServices/hooks/useLocations";
import { Location } from "src/apiServices/types/locationsApi.types";
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
  StyledLoader,
} from "./SearchFormInput.styled";
import cityIcon from "src/assets/images/city.svg";
import countryIcon from "src/assets/images/country.svg";
import airplaneIcon from "src/assets/images/airplane.svg";
import planetEarthIcon from "src/assets/images/planetEarthIcon.png";
import globeIcon from "src/assets/images/globe.svg";
import { Colors } from "src/enums/colors.enum";
import { useMediaQuery } from "react-responsive";
import { Button } from "src/styles/Button.styled";
import { useCodes } from "src/apiServices/hooks/useCodes";
import { LocationsType } from "src/enums/locationsType.enum";
import { Breakpoint } from "src/enums/breakpoint.enum";

export const SearchFormInput: React.FC<SearchFormInputProps> = ({
  label,
  placeholder,
  className,
  type,
  currentRecommendedPlace,
  hasCurrentRecommendedPlacesChanged,
  setHasCurrentRecommendedPlacesChanged,
  ...props
}) => {
  const [place, setPlace] = useState<string>("");
  const [currentCodes, setCurrentCodes] = useState<string[]>([]);

  const [, , helpers] = useField(props);

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const { data: codes } = useCodes();
  const { data, refetch, isFetching } = useLocations({
    term: place,
    limit: 6,
    location_types: ["airport", "city", "country"],
    sort: "name",
  });

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
    onSelectedItemChange: ({ selectedItem }) => {
      return selectedItem ? handleOnSelect(selectedItem) : null;
    },

    itemToString: (item) => (item ? item.name : ""),
  });

  const { setValue } = helpers; //set Formik value

  const getCurrentCountryCodes = useCallback(() => {
    if (codes?.data && data?.data.locations) {
      const currentCountriesArray = data?.data.locations.map((location) =>
        getCountryName(location)
      );
      const countriesData = Object.entries(codes?.data);
      const countries = Object.values(codes?.data);
      const currentCodes: string[] = [];
      currentCountriesArray.forEach((el, index) => {
        if (!countries.includes(el)) {
          currentCodes[index] = "unindentified";
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

  const getCountryName = (location: Location) => {
    switch (location.type) {
      case LocationsType.Airport:
        if (
          location.hasOwnProperty("country") &&
          location.hasOwnProperty("city")
        ) {
          return location.country?.name;
        }
        return location.city?.country.name;
      case LocationsType.City:
        return location.country?.name;
      case LocationsType.Country:
        return location.name;
    }
  };

  const getLocationIcon = (location: Location) => {
    if (location.type === LocationsType.Airport) return airplaneIcon;

    if (location.type === LocationsType.City) return cityIcon;

    if (location.type === LocationsType.Country) return countryIcon;

    return "";
  };

  const getCountryFlag = (index: number) => {
    return currentCodes[index] !== "unindentified"
      ? `https://flagcdn.com/24x18/${currentCodes[index]}.png`
      : planetEarthIcon;
  };

  const loadOptions = (
    inputValue: string | undefined,
    selectedItem: Location | null | undefined
  ) => {
    if (selectedItem && selectedItem.name === inputValue) {
      return;
    }

    if (inputValue && inputValue !== "anywhere") {
      setPlace(inputValue);
      setValue(selectedItem ? selectedItem.id : "");
    }
  };

  const handleOnSelect = (selectedItem: Location) => {
    if (inputValue && inputValue !== "anywhere") {
      setHasCurrentRecommendedPlacesChanged?.(false);
      setValue(selectedItem.id);
    }
  };

  const handleClickAnywhere = () => {
    setInputValue("anywhere");
    setValue("anywhere");
    toggleMenu();
  };

  useEffect(() => {
    if (place === currentRecommendedPlace?.place) return;
    if (place.trim() !== "") {
      refetch();
    }
  }, [currentRecommendedPlace?.place, place, refetch]);

  useEffect(() => {
    if (data?.data.locations) {
      getCurrentCountryCodes();
    }
  }, [data?.data.locations, getCurrentCountryCodes]);

  useEffect(() => {
    if (currentRecommendedPlace && hasCurrentRecommendedPlacesChanged) {
      setInputValue(currentRecommendedPlace.inputText);
    }
  }, [
    currentRecommendedPlace,
    hasCurrentRecommendedPlacesChanged,
    setInputValue,
  ]);

  return (
    <InputWrapper isFullscreen={!isTabletS && isOpen} {...getComboboxProps()}>
      <StyledLabelWrapper isFullscreen={!isTabletS && isOpen}>
        <StyledLabel {...getLabelProps()} isFullscreen={!isTabletS && isOpen}>
          {label}
          {isFetching && isOpen && (
            <StyledLoader
              type="ThreeDots"
              color={!isTabletS && isOpen ? Colors.DarkerBlue : Colors.White}
              width={16}
              height={16}
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
        {...getInputProps()}
        isFullscreen={!isTabletS && isOpen}
        placeholder={placeholder}
      />

      <StyledList isFullscreen={!isTabletS && isOpen} {...getMenuProps()}>
        {isOpen &&
          !isFetching &&
          inputValue !== "" &&
          data?.data.locations.map((location, index) => (
            <StyledItem
              isFullscreen={!isTabletS && isOpen}
              {...getItemProps({
                key: `${location.id}${index}`,
                item: location,
                index,
                style: {
                  backgroundColor:
                    highlightedIndex === index
                      ? `${Colors.Silver}`
                      : `${Colors.White}`,
                },
              })}
            >
              <StyledIcon src={getLocationIcon(location)} />
              <PlaceInfoWrapper>
                <p>{location.name}</p>
                {location.type !== LocationsType.Country && (
                  <StyledCountryName>
                    {getCountryName(location)}
                  </StyledCountryName>
                )}
              </PlaceInfoWrapper>

              <StyledFlag src={getCountryFlag(index)} alt="country flag" />
            </StyledItem>
          ))}
        {isOpen && inputValue !== "" && currentRecommendedPlace && (
          <AnywhereItem onClick={handleClickAnywhere}>
            <StyledGlobe src={globeIcon} />
            <div>
              <p>Not decided where?</p>
              <p>
                Choose to fly<span>anywhere</span>
              </p>
            </div>
          </AnywhereItem>
        )}
      </StyledList>
    </InputWrapper>
  );
};
