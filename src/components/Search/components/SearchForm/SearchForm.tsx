import React, { useContext } from "react";
import { Formik } from "formik";
import { Wrapper, StyledForm, InputsWrapper } from "./SearchForm.styled";
import { SearchFormInput } from "../SearchFormInput/SearchFormInput";
import { Button } from "../../../../styles/Button.styled";
import { SearchFormDatePicker } from "../SearchFormDatePicker/SearchFormDatePicker";
import { SearchContext } from "../../context/search.context";
import { SearchActions } from "../../reducer/searchActions.enum";
import { useTranslation } from "react-i18next";
import { SearchFormInitialValues } from "./SearchForm.types";

export const SearchForm: React.FC<{
  currentRecommendedPlace: {
    id: string;
    place_key?: string;
    place: string;
    inputText: string;
  };
  hasCurrentRecommendedPlacesChanged: boolean;
  setHasCurrentRecommendedPlacesChanged: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}> = ({
  currentRecommendedPlace,
  hasCurrentRecommendedPlacesChanged,
  setHasCurrentRecommendedPlacesChanged,
}) => {
  const initialValues: SearchFormInitialValues = {
    start: "",
    destination: "",
    date: {
      depart: "",
      return: "",
    },
  };

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          if (
            currentRecommendedPlace &&
            hasCurrentRecommendedPlacesChanged &&
            values.destination !== "anywhere"
          ) {
            values.destination = currentRecommendedPlace.id;
            setHasCurrentRecommendedPlacesChanged(false);
          }
          console.log(
            `Start:${values.start}`,
            `Destynacja:${values.destination}`
          );
          resetForm();
        }}
      >
        <StyledForm>
          <InputsWrapper>
            <SearchFormInput
              label={t("views.home.labels.start")}
              name="start"
              placeholder={t("views.home.placeholders.start")}
              type="text"
            />
            <SearchFormInput
              label={t("views.home.labels.destination")}
              name="destination"
              placeholder={t("views.home.placeholders.destination")}
              type="text"
              currentRecommendedPlace={currentRecommendedPlace}
              hasCurrentRecommendedPlacesChanged={
                hasCurrentRecommendedPlacesChanged
              }
              setHasCurrentRecommendedPlacesChanged={
                setHasCurrentRecommendedPlacesChanged
              }
            />
            <SearchFormDatePicker name="date" />
          </InputsWrapper>

          <Button variant="quaternary" type="submit">
            {t("views.home.buttons.search")}
          </Button>
        </StyledForm>
      </Formik>
    </Wrapper>
  );
};
