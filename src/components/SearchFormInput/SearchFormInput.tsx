import React, { useEffect, useState, useCallback } from "react";
import Downshift from "downshift";
import { useField } from "formik";
import { SearchFormInputProps } from "./SearchFormInput.types";
import { usePlaces } from "../../apiServices/hooks/usePlaces";
import { Place } from "../../apiServices/types/skyscannerApi.types";
import {
  InputWrapper,
  PlaceInfoWrapper,
  StyledCountryName,
  StyledFlag,
  StyledInput,
  StyledItem,
  StyledLabel,
  StyledLabelWrapper,
  StyledList,
  StyledLoader,
} from "./SearchFormInput.styled";
import planetEarthIcon from "../../assets/planetEarthIcon.png";
import { Colors } from "../../enums/colors.enum";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../styles/Button.styled";
import { useCodes } from "../../apiServices/hooks/useCodes";

export const SearchFormInput: React.FC<SearchFormInputProps> = ({
  label,
  placeholder,
  className,
  type,
  ...props
}) => {
  const [place, setPlace] = useState<string>("");
  const [currentCodes, setCurrentCodes] = useState<string[]>([]);
  const [field, meta, helpers] = useField(props);

  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });

  const { data: codes } = useCodes();
  const { data, refetch, isFetching } = usePlaces(place);

  const getCurrentCountryCodes = useCallback(() => {
    if (codes?.data && data?.data.Places) {
      const currentCountriesArray = data?.data.Places.map(
        (place) => place.CountryName
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
  }, [codes?.data, data?.data.Places]);

  const { setValue } = helpers; //set Formik value

  const loadOptions = (inputValue: string, selectedItem: Place) => {
    if (selectedItem && selectedItem.PlaceName === inputValue) {
      return;
    }
    if (inputValue) {
      setPlace(inputValue);
    }
  };

  const handleOnSelect = (selectedItem: Place) => {
    setValue(selectedItem.PlaceName);
  };

  useEffect(() => {
    if (place.trim() !== "") {
      refetch();
    }
  }, [place, refetch]);

  useEffect(() => {
    if (data?.data.Places) {
      getCurrentCountryCodes();
    }
  }, [data?.data.Places, getCurrentCountryCodes]);

  return (
    <Downshift
      onInputValueChange={(inputValue, { selectedItem }) =>
        loadOptions(inputValue, selectedItem)
      }
      onSelect={(selectedItem) =>
        selectedItem ? handleOnSelect(selectedItem) : null
      }
      itemToString={(item) => (item ? item.PlaceName : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getLabelProps,
        getRootProps,
        inputValue,
        highlightedIndex,
        selectedItem,
        isOpen,
        toggleMenu,
      }) => (
        <InputWrapper isOpen={isMobile && isOpen} {...getRootProps()}>
          <StyledLabelWrapper isOpen={isMobile && isOpen}>
            <StyledLabel
              isOpen={isMobile && isOpen}
              htmlFor={label}
              {...getLabelProps()}
            >
              {label}
              {isFetching && isOpen && (
                <StyledLoader
                  type="ThreeDots"
                  color={isMobile && isOpen ? Colors.DarkerBlue : Colors.White}
                  width={16}
                  height={16}
                />
              )}
            </StyledLabel>
            {isMobile && isOpen && (
              <Button onClick={() => toggleMenu()} variant="tertiary">
                Cancel
              </Button>
            )}
          </StyledLabelWrapper>
          <StyledInput
            isOpen={isMobile && isOpen}
            id={label}
            placeholder={placeholder}
            {...getInputProps()}
          />
          <StyledList isOpen={isMobile && isOpen} {...getMenuProps()}>
            {isOpen &&
              inputValue !== "" &&
              data?.data.Places.map((item, index) => (
                <StyledItem
                  isOpen={isMobile && isOpen}
                  {...getItemProps({
                    key: `${item.PlaceName}${index}`,
                    item,
                    index,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : "white",
                      fontWeight: selectedItem === item ? 700 : 500,
                    },
                  })}
                >
                  <PlaceInfoWrapper>
                    {item.PlaceName}
                    <StyledCountryName>{item.CountryName}</StyledCountryName>
                  </PlaceInfoWrapper>

                  <StyledFlag
                    src={
                      currentCodes[index] !== "unindentified"
                        ? `https://flagcdn.com/24x18/${currentCodes[index]}.png`
                        : planetEarthIcon
                    }
                    alt=""
                  />
                </StyledItem>
              ))}
          </StyledList>
        </InputWrapper>
      )}
    </Downshift>
  );
};
