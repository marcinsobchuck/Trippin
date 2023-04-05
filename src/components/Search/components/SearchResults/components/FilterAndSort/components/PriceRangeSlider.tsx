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
  setRangeSliderValue,
} from "src/components/Search/reducer/actions/search.actions";
import { Price } from "src/components/Search/reducer/types/searchReducer.types";

interface PriceRangeSliderProps {
  parameters: SearchParameters;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  parameters,
}) => {
  const [price, setPrice] = useState<Price>({ min: 0, max: 0 });
  const [value, setValue] = useState<number[]>([price.min, price.max]);

  const {
    regionalSettings: {
      currency: { currencyCode },
    },
  } = useAuth();

  const [{ isParamsEqual }, dispatch] = useSearchContext();
  const { isLoading, isError, data } = useSearchResults(parameters);

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

  const valueToText = (value: number) => `${value}`;

  const noFlights = data?.data.data.length === 0;
  const flights = data?.data.data;

  const getMinAndMaxPrice = useCallback(
    (data: Flight[]) => {
      if (noFlights) setValue([0, 0]);
      const prices = data.map((flight) => flight.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPrice({ min, max });
      setValue([min, max]);
    },
    [noFlights]
  );

  useEffect(() => {
    if (flights && !isParamsEqual) {
      getMinAndMaxPrice(flights);
    }
  }, [flights, getMinAndMaxPrice, isParamsEqual]);

  if (isError) {
    return <Wrapper>Can't get the price</Wrapper>;
  }

  return (
    <Wrapper>
      <Label>
        <LabelText>Price range</LabelText>

        {isLoading ? (
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
        min={price.min}
        max={price.max}
        disabled={isLoading}
      />
    </Wrapper>
  );
};
