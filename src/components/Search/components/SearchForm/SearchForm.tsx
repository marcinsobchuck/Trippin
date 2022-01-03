import React from "react";
import { Formik } from "formik";
import { Wrapper, StyledForm, InputsWrapper } from "./SearchForm.styled";
import { SearchFormInput } from "../SearchFormInput/SearchFormInput";
import { Button } from "../../../../styles/Button.styled";
import { SearchFormDatePicker } from "../SearchFormDatePicker/SearchFormDatePicker";
import { useTranslation } from "react-i18next";
import { SearchFormInitialValues } from "./SearchForm.types";
import { useSearchContext } from "../../hooks/useSearchContext";
import { SearchActions } from "../../reducer/enums/searchActions.enum";

export const SearchForm: React.FC = () => {
  const initialValues: SearchFormInitialValues = {
    start: "",
    destination: "",
    date: {
      depart: "",
      return: "",
    },
  };

  const [state, dispatch] = useSearchContext();

  const { currentRecommendedPlace, hasRecommendedPlaceChanged } = state;

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (
            currentRecommendedPlace &&
            hasRecommendedPlaceChanged &&
            values.destination !== "anywhere"
          ) {
            values.destination = currentRecommendedPlace.id;
            dispatch({
              type: SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED,
              payload: false,
            });
          }
          console.log(
            `Start:${values.start}`,
            `Destynacja:${values.destination}`,
            `Data: ${values.date.depart} ${values.date.return}`
          );
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
              isDestination
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
