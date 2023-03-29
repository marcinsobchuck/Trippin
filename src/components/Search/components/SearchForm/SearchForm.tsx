import React, { useState } from "react";
import isEqual from "lodash.isequal";
import { Formik, FormikProps } from "formik";
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
import { SearchFormRadio } from "../SearchFormRadio/SearchFormRadio";
import adult from "src/assets/images/adult.svg";
import child from "src/assets/images/child.svg";
import infant from "src/assets/images/infant.svg";
import { SearchFormFlightSettingsModal } from "../SearchFormFlightSettingsModal/SearchFormFlightSettingsModal";
import { RecommendedPlace } from "src/shared/types";
import { searchSchema } from "./config";
import {
  setCabinClass,
  setFlightType,
  setIsFormSubmitting,
  setIsParamsEqual,
  setPassengers,
  setRangeSliderValue,
  setSearchFormData,
} from "../../reducer/actions/search.actions";

interface SearchFormProps {
  formRef: React.Ref<FormikProps<SearchFormInitialValues>>;
  currentRecommendedPlace: RecommendedPlace;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  formRef,
  currentRecommendedPlace,
}) => {
  const initialValues: SearchFormInitialValues = {
    start: {
      id: "",
      text: "",
    },
    destination: {
      id: "",
      text: "",
    },
    date: {
      departDate: "",
      returnDate: "",
    },
    flightType: "round",
    flightSettings: {
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      code: "M",
      text: "Economy",
    },
  };

  const [showFlightSettingsModal, setShowFlightSettingsModal] =
    useState<boolean>(false);

  const [state, dispatch] = useSearchContext();

  const { t } = useTranslation();

  const handleSubmit = ({
    start,
    destination,
    date: { departDate, returnDate },
    flightType,
    flightSettings: { passengers, code, text },
  }: SearchFormInitialValues) => {
    const dataToSubmit = {
      searchFormData: {
        start: {
          id: start.id,
          text: start.text,
        },
        destination: {
          id: destination.id,
          text: destination.text,
        },
        departDate,
        returnDate,
      },
      flightType,
      passengers,
      cabinClass: {
        code,
        text,
      },
    };

    const paramsCheck = isEqual(dataToSubmit, {
      searchFormData: state.searchFormData,
      flightType: state.flightType,
      passengers: state.passengers,
      cabinClass: state.cabinClass,
    });

    setIsParamsEqual(dispatch, paramsCheck);
    setIsFormSubmitting(dispatch, true);
    setFlightType(dispatch, dataToSubmit.flightType);
    setPassengers(dispatch, dataToSubmit.passengers);
    setCabinClass(dispatch, dataToSubmit.cabinClass);
    setSearchFormData(dispatch, dataToSubmit.searchFormData);
    setRangeSliderValue(dispatch, [0, 0]);
    setIsFormSubmitting(dispatch, false);
  };

  return (
    <Wrapper>
      <Formik
        validationSchema={searchSchema}
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={handleSubmit}
      >
        {({ values, errors }: FormikProps<SearchFormInitialValues>) => (
          <StyledForm>
            <SettingsWrapper>
              <SearchFormRadio name='flightType' />

              <FlightSettings
                onClick={() =>
                  setShowFlightSettingsModal((prevState) => !prevState)
                }
              >
                <PassengersWrapper>
                  <ItemWrapper>
                    <StyledIcon src={adult} />
                    <ItemText>
                      {values.flightSettings.passengers.adults}
                    </ItemText>
                  </ItemWrapper>
                  <ItemWrapper>
                    <StyledIcon src={child} />
                    <ItemText>
                      {values.flightSettings.passengers.children}
                    </ItemText>
                  </ItemWrapper>
                  <ItemWrapper>
                    <StyledIcon src={infant} />
                    <ItemText>
                      {values.flightSettings.passengers.infants}
                    </ItemText>
                  </ItemWrapper>
                </PassengersWrapper>
                <ItemText>{values.flightSettings.text}</ItemText>
              </FlightSettings>

              <SearchFormFlightSettingsModal
                setShowFlightSettingsModal={setShowFlightSettingsModal}
                showFlightSettingsModal={showFlightSettingsModal}
                name='flightSettings'
              />
            </SettingsWrapper>
            <InputsWrapper>
              <SearchFormInput
                label={t("views.home.labels.start")}
                name='start'
                placeholder={t("views.home.placeholders.start")}
                type='text'
              />
              <SearchFormInput
                label={t("views.home.labels.destination")}
                name='destination'
                placeholder={t("views.home.placeholders.destination")}
                type='text'
                currentRecommendedPlace={currentRecommendedPlace}
                isDestination
              />
              <SearchFormDatePicker name='date' />
            </InputsWrapper>

            <Button variant='quaternary' type='submit'>
              {t("views.home.buttons.search")}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};
