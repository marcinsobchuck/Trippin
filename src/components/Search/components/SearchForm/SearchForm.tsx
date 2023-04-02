import React, { useEffect, useState } from "react";
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
import { useSearchContext } from "../../hooks/useSearchContext";
import { SearchFormRadio } from "../SearchFormRadio/SearchFormRadio";
import adult from "src/assets/images/adult.svg";
import child from "src/assets/images/child.svg";
import infant from "src/assets/images/infant.svg";
import { SearchFormFlightSettingsModal } from "../SearchFormFlightSettingsModal/SearchFormFlightSettingsModal";
import { RecommendedPlace, SearchFormTypes } from "src/shared/types";
import { searchSchema } from "./config";
import { setSearchFormData } from "../../reducer/actions/search.actions";

interface SearchFormProps {
  formRef: React.Ref<FormikProps<SearchFormTypes>>;
  currentRecommendedPlace: RecommendedPlace;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  formRef,
  currentRecommendedPlace,
}) => {
  const initialValues: SearchFormTypes = {
    start: {
      id: "",
      text: "",
    },
    destination: {
      id: "",
      text: "",
    },
    date: {
      inbound: "",
      outbound: "",
    },
    flightType: "round",
    flightSettings: {
      adults: 1,
      children: 0,
      infants: 0,
      cabinCode: "M",
      cabinClass: "Economy",
    },
  };

  const [showFlightSettingsModal, setShowFlightSettingsModal] =
    useState<boolean>(false);

  const [state, dispatch] = useSearchContext();

  const { t } = useTranslation();

  const handleSubmit = (submitData: SearchFormTypes) => {
    setSearchFormData(dispatch, submitData);
  };

  return (
    <Wrapper>
      <Formik
        validationSchema={searchSchema}
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={handleSubmit}
      >
        {({ values, errors }: FormikProps<SearchFormTypes>) => (
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
                    <ItemText>{values.flightSettings.adults}</ItemText>
                  </ItemWrapper>
                  <ItemWrapper>
                    <StyledIcon src={child} />
                    <ItemText>{values.flightSettings.children}</ItemText>
                  </ItemWrapper>
                  <ItemWrapper>
                    <StyledIcon src={infant} />
                    <ItemText>{values.flightSettings.infants}</ItemText>
                  </ItemWrapper>
                </PassengersWrapper>
                <ItemText>{values.flightSettings.cabinClass}</ItemText>
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
