import React, { useState } from "react";
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
import { SearchActions } from "../../reducer/enums/searchActions.enum";
import { SearchFormRadio } from "../SearchFormRadio/SearchFormRadio";
import adult from "src/assets/images/adult.svg";
import child from "src/assets/images/child.svg";
import infant from "src/assets/images/infant.svg";
import { SearchFormFlightSettingsModal } from "../SearchFormFlightSettingsModal/SearchFormFlightSettingsModal";
import * as Yup from "yup";
import { RecommendedPlace } from "src/shared/types";

const searchSchema = Yup.object().shape({
  start: Yup.object({
    id: Yup.string().required("Required"),
  }),
  date: Yup.object().when("flightType", {
    is: "round",
    then: Yup.object({
      departDate: Yup.string().required("Required"),
      returnDate: Yup.string().required("If round, return required"),
    }),
    otherwise: Yup.object({
      departDate: Yup.string().required("Required"),
    }),
  }),
});

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

  const [, dispatch] = useSearchContext();

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Formik
        validationSchema={searchSchema}
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={({
          start,
          destination,
          date: { departDate, returnDate },
          flightType,
          flightSettings: { passengers, code, text },
        }) => {
          dispatch({
            type: SearchActions.SET_IS_FORM_SUBMITTING,
            payload: true,
          });
          dispatch({
            type: SearchActions.SET_FLIGHT_TYPE,
            payload: flightType,
          });
          dispatch({ type: SearchActions.SET_PASSENGERS, payload: passengers });
          dispatch({
            type: SearchActions.SET_CABIN_CLASS,
            payload: { code, text },
          });
          dispatch({
            type: SearchActions.SET_SEARCH_FORM_DATA,
            payload: {
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
          });
          dispatch({
            type: SearchActions.SET_IS_FORM_SUBMITTING,
            payload: false,
          });
          window.scrollTo({
            top: document.documentElement.clientHeight,
            behavior: "smooth",
          });
        }}
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
            <p style={{ color: "white" }}>
              {JSON.stringify(values, null, 2)}
              {JSON.stringify(errors, null, 2)}
            </p>
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
