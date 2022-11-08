import React, { useCallback, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { Flight, SearchParameters } from "src/apiServices/types/kiwiApi.types";
import { Label, LabelText, Wrapper } from "./PriceRangeSlider.styled";
import { useAuth } from "src/hooks/useAuth";
import { useSearchContext } from "src/components/Search/hooks/useSearchContext";
import { useSearchResults } from "src/apiServices/hooks/useSearchResults";
import { Oval } from "react-loader-spinner";
import { Colors } from "src/enums/colors.enum";
import {
  setIsParamsEqual,
  setPrice,
  setRangeSliderValue,
} from "src/components/Search/reducer/actions/search.actions";

interface PriceRangeSliderProps {
  flightsData: Flight[];

  parameters: SearchParameters;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  flightsData,
  parameters,
}) => {
  const {
    regionalSettings: {
      currency: { currencyCode },
    },
  } = useAuth();

  const [
    {
      price: { min, max },
      isParamsEqual,
      rangeSliderValue,
    },
    dispatch,
  ] = useSearchContext();

  const [value, setValue] = useState<number[]>([0, 0]);

  const valueToText = (value: number) => `${value}`;

  const { isFetching, isError } = useSearchResults(parameters);

  const handleChange = (event: Event, newValue: number[] | number) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommited = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number[] | number
  ) => {
    setIsParamsEqual(dispatch, true);
    setRangeSliderValue(dispatch, newValue as number[]);
  };

  const noFlights = flightsData?.length === 0;

  const getMinAndMaxPrice = useCallback(
    (data: Flight[]) => {
      if (noFlights) setValue([0, 0]);

      if (!isParamsEqual) {
        const prices = data.map((flight) => flight.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPrice(dispatch, { min, max });
        setValue([min, max]);
      }
    },
    [dispatch, isParamsEqual, noFlights]
  );

  useEffect(() => {
    if (!isParamsEqual && flightsData) {
      getMinAndMaxPrice(flightsData);
    }

    if (isParamsEqual) {
      setValue([rangeSliderValue[0], rangeSliderValue[1]]);
    }
  }, [flightsData, getMinAndMaxPrice, isParamsEqual, rangeSliderValue]);

  if (isError) {
    return <Wrapper>Can't get the price</Wrapper>;
  }

  if (flightsData) {
    return (
      <Wrapper>
        <Label>
          <LabelText> Price range</LabelText>

          {isFetching ? (
            <Oval
              color={Colors.DeepDarkBlue}
              secondaryColor={Colors.LightBlue}
              width={22}
              height={22}
            />
          ) : (
            <LabelText>
              {noFlights ? "0" : `${value[0]} - ${value[1]}`}
              <span>{currencyCode}</span>
            </LabelText>
          )}
        </Label>

        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommited}
          getAriaValueText={valueToText}
          getAriaLabel={() => "Price range"}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          disabled={isFetching}
        />
      </Wrapper>
    );
  }
  return null;
};
