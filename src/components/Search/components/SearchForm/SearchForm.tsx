import React, { useState } from "react";
import { Formik } from "formik";
import {
  Wrapper,
  StyledForm,
  InputsWrapper,
  FlightSettings,
  StyledIcon,
  SettingsWrapper,
  ItemWrapper,
  ItemText,
  PassengersWrapper,
} from "./SearchForm.styled";
import { SearchFormInput } from "../SearchFormInput/SearchFormInput";
import { Button } from "../../../../styles/Button.styled";
import { SearchFormDatePicker } from "../SearchFormDatePicker/SearchFormDatePicker";
import { useTranslation } from "react-i18next";
import { SearchFormInitialValues } from "./SearchForm.types";
import { useSearchContext } from "../../hooks/useSearchContext";
import { SearchActions } from "../../reducer/enums/searchActions.enum";
import { SearchFormRadio } from "../SearchFormRadio/SearchFormRadio";
import adult from "src/assets/images/adult.svg";
import child from "src/assets/images/child.svg";
import infant from "src/assets/images/infant.svg";
import { SearchFormFlightSettingsModal } from "../SearchFormFlightSettingsModal/SearchFormFlightSettingsModal";

export const SearchForm: React.FC = () => {
  const initialValues: SearchFormInitialValues = {
    start: "",
    destination: "",
    date: {
      depart: "",
      return: "",
    },
    flightType: "round",
  };

  const [showFlightSettingsModal, setShowFlightSettingsModal] =
    useState<boolean>(false);

  const [state, dispatch] = useSearchContext();

  const {
    currentRecommendedPlace,
    hasRecommendedPlaceChanged,
    adults,
    children,
    infants,
    cabinClass,
  } = state;

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
            `Data: ${values.date.depart} ${values.date.return}`,
            `Typ lotu: ${values.flightType}`
          );
        }}
      >
        <StyledForm>
          <SettingsWrapper>
            <SearchFormRadio name="flightType" />
            <FlightSettings
              onClick={() =>
                setShowFlightSettingsModal((prevState) => !prevState)
              }
            >
              <PassengersWrapper>
                <ItemWrapper>
                  <StyledIcon src={adult} />
                  <ItemText>{adults}</ItemText>
                </ItemWrapper>
                <ItemWrapper>
                  <StyledIcon src={child} />
                  <ItemText>{children}</ItemText>
                </ItemWrapper>
                <ItemWrapper>
                  <StyledIcon src={infant} />
                  <ItemText>{infants}</ItemText>
                </ItemWrapper>
              </PassengersWrapper>
              <ItemText>{cabinClass.text}</ItemText>
            </FlightSettings>

            <SearchFormFlightSettingsModal
              setShowFlightSettingsModal={setShowFlightSettingsModal}
              showFlightSettingsModal={showFlightSettingsModal}
            />
          </SettingsWrapper>

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
