import React, { useEffect } from "react";
import { SearchFormRadioProps } from "./SearchFormRadio.types";
import {
  StyledInput,
  StyledLabel,
  Title,
  Wrapper,
} from "./SearchFormRadio.styled";
import { useField } from "formik";
import { useSearchContext } from "../../hooks/useSearchContext";
import { SearchActions } from "../../reducer/enums/searchActions.enum";

export const SearchFormRadio: React.FC<SearchFormRadioProps> = ({
  ...props
}) => {
  const [field] = useField(props);

  const [state, dispatch] = useSearchContext();

  console.log(state);

  useEffect(() => {
    dispatch({ type: SearchActions.SET_FLIGHT_TYPE, payload: field.value });
  }, [dispatch, field.value]);

  return (
    <Wrapper>
      <Title>Flight type</Title>
      <div role="group">
        <StyledLabel>
          <StyledInput {...field} type="radio" value="round" defaultChecked />
          <p>Round</p>
        </StyledLabel>
        <StyledLabel>
          <StyledInput {...field} type="radio" value="oneway" />
          Oneway
        </StyledLabel>
      </div>
    </Wrapper>
  );
};
