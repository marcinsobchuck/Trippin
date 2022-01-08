import React, { useEffect } from "react";
import { SearchFormRadioProps } from "./SearchFormRadio.types";
import {
  RadioWrapper,
  ReStyledRadioLabel,
  Title,
  Wrapper,
} from "./SearchFormRadio.styled";
import { useField } from "formik";
import { useSearchContext } from "../../hooks/useSearchContext";
import { SearchActions } from "../../reducer/enums/searchActions.enum";
import {
  CustomRadioInput,
  StyledRadioInput,
} from "src/styles/RadioInput.styled";

export const SearchFormRadio: React.FC<SearchFormRadioProps> = ({
  ...props
}) => {
  const [field] = useField(props);

  const [, dispatch] = useSearchContext();

  useEffect(() => {
    dispatch({ type: SearchActions.SET_FLIGHT_TYPE, payload: field.value });
  }, [dispatch, field.value]);

  return (
    <Wrapper>
      <Title>Flight type</Title>
      <RadioWrapper>
        <ReStyledRadioLabel>
          <StyledRadioInput
            {...field}
            type="radio"
            value="round"
            defaultChecked
          />
          <CustomRadioInput />
          Round
        </ReStyledRadioLabel>
        <ReStyledRadioLabel>
          <StyledRadioInput {...field} type="radio" value="oneway" />
          <CustomRadioInput />
          Oneway
        </ReStyledRadioLabel>
      </RadioWrapper>
    </Wrapper>
  );
};
