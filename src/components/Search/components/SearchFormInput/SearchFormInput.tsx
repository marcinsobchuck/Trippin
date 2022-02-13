import React, { useEffect, useState, useCallback } from "react";
import { useCombobox } from "downshift";
import { useField } from "formik";
import { SearchFormInputProps } from "./SearchFormInput.types";
import { useLocations } from "src/apiServices/hooks/useLocations";
import { Location } from "src/apiServices/types/kiwiApi.types";
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
} from "./SearchFormInput.styled";
import { ThreeDots } from "react-loader-spinner";

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
import { useLockBodyScroll } from "src/hooks/useLockBodyScroll";
import { useSearchContext } from "../../hooks/useSearchContext";
import { SearchActions } from "../../reducer/enums/searchActions.enum";

export const SearchFormInput: React.FC<SearchFormInputProps> = ({
  label,
  placeholder,
  className,
  type,
  isDestination,
  ...props
}) => {
  const [currentCodes, setCurrentCodes] = useState<string[]>([]);
  const [place, setPlace] = useState<string>("");

  const [, , helpers] = useField(props);

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const [state, dispatch] = useSearchContext();

  const { currentRecommendedPlace, hasRecommendedPlaceChanged } = state;

  const { data: codes } = useCodes();
  const { data, refetch, isFetching } = useLocations({
    term: place,
    limit: isTabletS ? 6 : 10,
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
    selectedItem,
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
      const currentCountriesArray = data?.data.locations.map(
        (location) => getLocationParameters(location).name
      );
      const countriesData = Object.entries(codes.data);
      const countries = Object.values(codes.data);
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

  const getLocationParameters = (location: Location) => {
    switch (location.type) {
      case LocationsType.Airport:
        if (
          location.hasOwnProperty("country") &&
          location.hasOwnProperty("city")
        ) {
          return {
            name: location.country?.name,
            icon: airplaneIcon,
          };
        }
        return { name: location.city?.country.name, icon: airplaneIcon };
      case LocationsType.City:
        return {
          name: location.country?.name,
          icon: cityIcon,
        };
      case LocationsType.Country:
        return {
          name: location.name,
          icon: countryIcon,
        };
      default:
        return {
          name: "",
          icon: "",
        };
    }
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
    if (inputValue && inputValue !== "anywhere" && isDestination) {
      dispatch({
        type: SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED,
        payload: false,
      });
    }
    setValue(selectedItem.id);
  };

  const handleClickAnywhere = () => {
    dispatch({
      type: SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED,
      payload: false,
    });
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
    if (isDestination && hasRecommendedPlaceChanged) {
      setInputValue(currentRecommendedPlace.inputText);
    }
  }, [
    currentRecommendedPlace,
    isDestination,
    setInputValue,
    hasRecommendedPlaceChanged,
  ]);

  useEffect(() => {
    if (isDestination && inputValue === "") {
      dispatch({
        type: SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED,
        payload: false,
      });
    }
  }, [dispatch, inputValue, isDestination]);

  useLockBodyScroll(!isTabletS && isOpen);

  return (
    <InputWrapper isFullscreen={!isTabletS && isOpen} {...getComboboxProps()}>
      <StyledLabelWrapper isFullscreen={!isTabletS && isOpen}>
        <StyledLabel {...getLabelProps()} isFullscreen={!isTabletS && isOpen}>
          {label}
          {isFetching && isOpen && (
            <ThreeDots
              color={!isTabletS && isOpen ? Colors.DarkerBlue : Colors.White}
              width={16}
              height={16}
              wrapperStyle={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "6px",
              }}
            />
          )}
        </StyledLabel>
        {!isTabletS && isOpen && (
          <Button onClick={toggleMenu} variant='tertiary'>
            Cancel
          </Button>
        )}
      </StyledLabelWrapper>
      <StyledInput
        {...getInputProps({
          onBlur: () => {
            if (!selectedItem) setValue("");
          },
          onChange: (e: any) => {
            if (e.target.value === "") {
              setValue("");
            }
          },
        })}
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
              <StyledIcon src={getLocationParameters(location).icon} />
              <PlaceInfoWrapper>
                <p>{location.name}</p>
                {location.type !== LocationsType.Country && (
                  <StyledCountryName>
                    {getLocationParameters(location).name}
                  </StyledCountryName>
                )}
              </PlaceInfoWrapper>

              <StyledFlag src={getCountryFlag(index)} alt='country flag' />
            </StyledItem>
          ))}
        {isOpen && inputValue !== "" && isDestination && (
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
