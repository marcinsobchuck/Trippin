import React, { useCallback, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "src/enums/breakpoint.enum";
import { useOnClickOutside } from "src/hooks/useClickOutside";
import { useLockBodyScroll } from "src/hooks/useLockBodyScroll";
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
} from "./SearchFormFlightSettingsModal.styled";
import { SearchFormFlightSettingsProps } from "./SearchFormFlightSettingsModal.types";
import closeIcon from "src/assets/images/close.svg";
import { useModalAnimation } from "src/hooks/useModalAnimation";
import { animated } from "react-spring";
import adult from "src/assets/images/adult.svg";
import child from "src/assets/images/child.svg";
import infant from "src/assets/images/infant.svg";
import { Stepper } from "src/components/Stepper/Stepper";
import { useSearchContext } from "../../hooks/useSearchContext";
import { SearchActions } from "../../reducer/enums/searchActions.enum";
import {
  CustomRadioInput,
  StyledRadioInput,
} from "src/styles/RadioInput.styled";
import { cabinClassArray } from "./config";
import { CodeType, Passengers } from "../../reducer/types/searchReducer.types";

type Operation = "INCREMENT" | "DECREMENT";

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
    title: "Adults",
    underText: "Over 11",
    type: "adults",
    minValue: 1,
    maxValue: 9,
  },
  {
    icon: child,
    title: "Children",
    underText: "2-11",
    type: "children",
    minValue: 0,
    maxValue: 8,
  },
  {
    icon: infant,
    title: "Infants",
    underText: "Under 2",
    type: "infants",
    minValue: 0,
    maxValue: 1,
  },
];

export const SearchFormFlightSettingsModal: React.FC<
  SearchFormFlightSettingsProps
> = ({ setShowFlightSettingsModal, showFlightSettingsModal, ...props }) => {
  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });
  const ref = useRef(null);

  const [state, dispatch] = useSearchContext();

  const { passengers, cabinClass } = state;

  const handleCloseModal = () => setShowFlightSettingsModal(false);

  const setPassengers = useCallback(
    (passengerType: keyof Passengers, operation: Operation) => {
      dispatch({
        type: SearchActions.SET_PASSENGERS,
        payload: {
          ...passengers,
          [passengerType]:
            operation === "INCREMENT"
              ? passengers[passengerType] + 1
              : passengers[passengerType] - 1,
        },
      });
    },
    [dispatch, passengers]
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
              <Row>
                <RowLeftSide>
                  <StyledIcon src={stepper.icon} />
                  <div>
                    <StyledText>{stepper.title}</StyledText>
                    <UnderText>{stepper.underText}</UnderText>
                  </div>
                </RowLeftSide>
                <Stepper
                  increment={() => setPassengers(stepper.type, "INCREMENT")}
                  decrement={() => setPassengers(stepper.type, "DECREMENT")}
                  passengers={passengers}
                  value={passengers[stepper.type]}
                  minValue={stepper.minValue}
                  maxValue={stepper.maxValue}
                />
              </Row>
            ))}
            <SectionTitle>
              <p>Cabin class</p>
            </SectionTitle>

            <RadioWrapper role='group'>
              {cabinClassArray.map((cabin, index) => (
                <ReStyledRadioLabel key={index}>
                  <StyledRadioInput
                    type='radio'
                    name='cabin'
                    value={cabin.value}
                    defaultChecked={cabinClass.code === cabin.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: SearchActions.SET_CABIN_CLASS,
                        payload: {
                          code: e.currentTarget.value as CodeType,
                          text: cabin.text,
                        },
                      })
                    }
                  />
                  <CustomRadioInput />
                  {cabin.text}
                </ReStyledRadioLabel>
              ))}
            </RadioWrapper>
          </Wrapper>
        </animated.div>
      )
  );
};
