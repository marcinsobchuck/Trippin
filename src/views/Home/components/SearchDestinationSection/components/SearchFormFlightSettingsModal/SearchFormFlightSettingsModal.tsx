import React, { useCallback, useRef } from 'react';

import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { animated } from 'react-spring';

import { CabinCode } from 'src/apiServices/types/kiwiApi.types';
import { Icon } from 'src/components/Icon/Icon';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { useOnClickOutside } from 'src/hooks/useClickOutside';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { useModalAnimation } from 'src/hooks/useModalAnimation';
import { CustomRadioInput, StyledRadioInput } from 'src/styles/RadioInput.styled';
import { Passengers } from 'src/views/Home/reducer/types/searchReducer.types';

import { Stepper } from '../Stepper/Stepper';

import { cabinClassArray, steppersData } from './config';
import {
  IconWrapper,
  ModalTitle,
  RadioWrapper,
  ReStyledRadioLabel,
  Row,
  RowLeftSide,
  SectionTitle,
  StyledIcon,
  StyledText,
  UnderText,
  Wrapper,
} from './SearchFormFlightSettingsModal.styled';
import { Operation, SearchFormFlightSettingsProps } from './SearchFormFlightSettingsModal.types';

export const SearchFormFlightSettingsModal: React.FC<SearchFormFlightSettingsProps> = ({
  setShowFlightSettingsModal,
  showFlightSettingsModal,
  ...props
}) => {
  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });
  const ref = useRef(null);

  const handleCloseModal = () => setShowFlightSettingsModal(false);

  const [field, , { setValue }] = useField(props);

  const passengers = {
    adults: field.value.adults,
    children: field.value.children,
    infants: field.value.infants,
  };

  const setPassengers = useCallback(
    (passengerType: keyof Passengers, operation: Operation) => {
      setValue({
        ...field.value,
        [passengerType]:
          operation === 'INCREMENT' ? field.value[passengerType] + 1 : field.value[passengerType] - 1,
      });
    },
    [field.value, setValue],
  );

  useOnClickOutside(ref, handleCloseModal);
  useLockBodyScroll(!isTabletS && showFlightSettingsModal);
  const modalAnimation = useModalAnimation(showFlightSettingsModal);

  const { t } = useTranslation();

  return modalAnimation(
    (styles, item) =>
      item && (
        <animated.div
          style={{
            ...styles,
            zIndex: 10,
          }}
        >
          <Wrapper ref={ref} role="dialog">
            <IconWrapper onClick={handleCloseModal}>
              <Icon name="closeIcon" height={16} width={16} fill={Colors.DarkerBlue} />
            </IconWrapper>
            <ModalTitle>{t('views.home.modals.flightSettings')}</ModalTitle>
            <SectionTitle>
              <p>{t('views.home.flightSettings.passengers')}</p>
              <UnderText>(max. 9)</UnderText>
            </SectionTitle>
            {steppersData.map((stepper) => (
              <Row key={stepper.icon}>
                <RowLeftSide>
                  <StyledIcon src={stepper.icon} />
                  <div>
                    <StyledText>{t(stepper.stepper_key)}</StyledText>
                    <UnderText>
                      {stepper.ageRestriction !== null
                        ? t(stepper.underText, { count: stepper.ageRestriction })
                        : t(stepper.underText)}
                    </UnderText>
                  </div>
                </RowLeftSide>
                <Stepper
                  increment={() => setPassengers(stepper.type, 'INCREMENT')}
                  decrement={() => setPassengers(stepper.type, 'DECREMENT')}
                  passengers={passengers}
                  value={field.value[stepper.type]}
                  minValue={stepper.minValue}
                  maxValue={stepper.maxValue}
                  testIncrementId={stepper.testIncrementId}
                />
              </Row>
            ))}
            <SectionTitle>
              <p>{t('views.home.flightSettings.cabinClass')}</p>
            </SectionTitle>

            <RadioWrapper role="group">
              {cabinClassArray.map((cabin) => (
                <ReStyledRadioLabel key={cabin.value}>
                  <StyledRadioInput
                    {...field}
                    value={cabin.value}
                    onChange={(event) => {
                      setValue({
                        ...field.value,
                        cabinCode: event.currentTarget.value as CabinCode,
                        cabin_key: cabin.cabin_key,
                      });
                    }}
                    type="radio"
                    defaultChecked={cabin.value === field.value.cabinCode}
                  />
                  <CustomRadioInput />
                  {t(cabin.cabin_key)}
                </ReStyledRadioLabel>
              ))}
            </RadioWrapper>
          </Wrapper>
        </animated.div>
      ),
  );
};
