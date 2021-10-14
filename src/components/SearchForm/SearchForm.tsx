import React, { useState } from "react";
import { Formik } from "formik";
import { Wrapper, StyledForm, InputsWrapper } from "./SearchForm.styled";
import { SearchFormInput } from "../SearchFormInput/SearchFormInput";
import { Button } from "../../styles/Button.styled";
import { SearchFormDatePicker } from "../SearchFormDatePicker/SearchFormDatePicker";

export const SearchForm: React.FC = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ start: "", destination: "" }}
        onSubmit={(values, { resetForm }) => {
          console.log(values.start, values.destination);
          resetForm();
        }}
      >
        <StyledForm>
          <InputsWrapper>
            <SearchFormInput
              label="Start"
              name="start"
              placeholder="Start"
              type="text"
            />
            <SearchFormInput
              label="Destination"
              name="destination"
              placeholder="Destination"
              type="text"
            />
          </InputsWrapper>
          <SearchFormDatePicker />
          <Button variant="quaternary" type="submit">
            Search flights
          </Button>
        </StyledForm>
      </Formik>
    </Wrapper>
  );
};
