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
import { useSearchResults } from "src/apiServices/hooks/useSearchResults";
import { useAuth } from "src/hooks/useAuth";
import * as Yup from "yup";
import { SearchParameters } from "src/apiServices/types/kiwiApi.types";

const searchSchema = Yup.object().shape({
  start: Yup.string().required("Required"),
  date: Yup.object().when("flightType", {
    is: "round",
    then: Yup.object({
      depart: Yup.string().required("Required"),
      return: Yup.string().required("If round, return required"),
    }),
    otherwise: Yup.object({
      depart: Yup.string().required("Required"),
    }),
  }),
});

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

  const {
    regionalSettings: {
      currency: { currencyCode },
    },
  } = useAuth();

  const [state, dispatch] = useSearchContext();

  const {
    currentRecommendedPlace,
    hasRecommendedPlaceChanged,
    passengers: { adults, children, infants },
    cabinClass: { code: cabinClassCode, text },
    searchFormData: { start, destination, return: returnDate, depart },
    flightType,
    limit,
  } = state;

  const getParameters = () => {
    const parameters: SearchParameters = {
      fly_from: start,
      fly_to: destination,
      date_from: depart,
      date_to: depart,
      flight_type: flightType,
      adults,
      selected_cabins: cabinClassCode,
      curr: currencyCode,
      limit: destination === "" || destination === "anywhere" ? 500 : limit,
    };

    if (flightType === "round") {
      parameters.return_from = returnDate;
      parameters.return_to = returnDate;
    }
    if (children !== 0) {
      parameters.children = children;
    }
    if (infants !== 0) {
      parameters.infants = infants;
    }

    return parameters;
  };

  const { refetch } = useSearchResults(getParameters());

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Formik
        validationSchema={searchSchema}
        initialValues={initialValues}
        onSubmit={(
          { start, destination, date, flightType },
          { setSubmitting }
        ) => {
          dispatch({ type: SearchActions.SET_IS_LOADING, payload: true });
          dispatch({ type: SearchActions.SET_SHOW_RESULTS, payload: true });
          if (hasRecommendedPlaceChanged) {
            destination = currentRecommendedPlace.id;
          }
          dispatch({
            type: SearchActions.SET_SEARCH_FORM_DATA,
            payload: {
              start,
              destination: hasRecommendedPlaceChanged
                ? currentRecommendedPlace.id
                : destination,
              depart: date.depart,
              return: date.return,
            },
          });
          dispatch({
            type: SearchActions.SET_FLIGHT_TYPE,
            payload: flightType,
          });
          setSubmitting(false);
          window.scrollTo({
            top: document.documentElement.clientHeight,
            behavior: "smooth",
          });
          refetch();
        }}
      >
        {(props: FormikProps<SearchFormInitialValues>) => (
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
                <ItemText>{text}</ItemText>
              </FlightSettings>

              <SearchFormFlightSettingsModal
                setShowFlightSettingsModal={setShowFlightSettingsModal}
                showFlightSettingsModal={showFlightSettingsModal}
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
