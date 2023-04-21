import React, { useCallback, useRef } from 'react';

import { useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
import { animated } from 'react-spring';

import adult from 'src/assets/images/adult.svg';
import child from 'src/assets/images/child.svg';
import closeIcon from 'src/assets/images/close.svg';
import infant from 'src/assets/images/infant.svg';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { useOnClickOutside } from 'src/hooks/useClickOutside';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { useModalAnimation } from 'src/hooks/useModalAnimation';
import { CabinCode } from 'src/shared/types';
import { CustomRadioInput, StyledRadioInput } from 'src/styles/RadioInput.styled';

import { Passengers } from '../../../../reducer/types/searchReducer.types';
import { Stepper } from '../Stepper/Stepper';

import { cabinClassArray } from './config';
import {
  CloseIcon,
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
import { SearchFormFlightSettingsProps } from './SearchFormFlightSettingsModal.types';

type Operation = 'INCREMENT' | 'DECREMENT';

interface SteppersDataType {
  icon: string;
  title: string;
  underText: string;
  type: keyof Passengers;
  minValue: number;
  maxValue: number;
}

const steppersData: SteppersDataType[] = [
  {
    icon: adult,
    title: 'Adults',
    underText: 'Over 11',
    type: 'adults',
    minValue: 1,
    maxValue: 9,
  },
  {
    icon: child,
    title: 'Children',
    underText: '2-11',
    type: 'children',
    minValue: 0,
    maxValue: 8,
  },
  {
    icon: infant,
    title: 'Infants',
    underText: 'Under 2',
    type: 'infants',
    minValue: 0,
    maxValue: 1,
  },
];

const getTextFromValue = (value: CabinCode) => {
  switch (value) {
    case 'M':
      return 'Economy';
    case 'W':
      return 'Economy premium';
    case 'C':
      return 'Business';
    case 'F':
      return 'First class';
    default:
      return 'Economy';
  }
};

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
          operation === 'INCREMENT'
            ? field.value[passengerType] + 1
            : field.value[passengerType] - 1,
      });
    },
    [field.value, setValue],
  );

  useOnClickOutside(ref, handleCloseModal);
  useLockBodyScroll(!isTabletS && showFlightSettingsModal);
  const modalAnimation = useModalAnimation(showFlightSettingsModal);
  return modalAnimation(
    (styles, item) =>
      item && (
        <animated.div
          style={{
            ...styles,
            zIndex: 10,
          }}
        >
          <Wrapper ref={ref}>
            <IconWrapper onClick={handleCloseModal}>
              <CloseIcon src={closeIcon} />
            </IconWrapper>
            <ModalTitle>Flight settings</ModalTitle>
            <SectionTitle>
              <p>Passengers</p>
              <UnderText>(max. 9)</UnderText>
            </SectionTitle>
            {steppersData.map((stepper) => (
              <Row key={stepper.icon}>
                <RowLeftSide>
                  <StyledIcon src={stepper.icon} />
                  <div>
                    <StyledText>{stepper.title}</StyledText>
                    <UnderText>{stepper.underText}</UnderText>
                  </div>
                </RowLeftSide>
                <Stepper
                  increment={() => setPassengers(stepper.type, 'INCREMENT')}
                  decrement={() => setPassengers(stepper.type, 'DECREMENT')}
                  passengers={passengers}
                  value={field.value[stepper.type]}
                  minValue={stepper.minValue}
                  maxValue={stepper.maxValue}
                />
              </Row>
            ))}
            <SectionTitle>
              <p>Cabin class</p>
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
                        cabinClass: getTextFromValue(event.currentTarget.value as CabinCode),
                      });
                    }}
                    type="radio"
                    defaultChecked={cabin.value === field.value.cabinCode}
                  />
                  <CustomRadioInput />
                  {cabin.text}
                </ReStyledRadioLabel>
              ))}
            </RadioWrapper>
          </Wrapper>
        </animated.div>
      ),
  );
};
