import React, { ChangeEvent, useRef } from "react";
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

export const SearchFormFlightSettingsModal: React.FC<
  SearchFormFlightSettingsProps
> = ({ setShowFlightSettingsModal, showFlightSettingsModal, ...props }) => {
  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });
  const ref = useRef(null);

  const [state, dispatch] = useSearchContext();

  const { adults, children, infants, cabinClass } = state;

  const handleCloseModal = () => setShowFlightSettingsModal(false);

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

            <Row>
              <RowLeftSide>
                <StyledIcon src={adult} />
                <div>
                  <StyledText>Adults</StyledText>
                  <UnderText>Over 11</UnderText>
                </div>
              </RowLeftSide>
              <Stepper
                increment={() =>
                  dispatch({
                    type: SearchActions.INCREMENT_ADULTS_NUMBER,
                  })
                }
                decrement={() =>
                  dispatch({
                    type: SearchActions.DECREMENT_ADULTS_NUMBER,
                  })
                }
                value={adults}
                minValue={1}
                maxValue={9}
              />
            </Row>
            <Row>
              <RowLeftSide>
                <StyledIcon src={child} />
                <div>
                  <StyledText>Children</StyledText>
                  <UnderText>2-11</UnderText>
                </div>
              </RowLeftSide>
              <Stepper
                increment={() =>
                  dispatch({
                    type: SearchActions.INCREMENT_CHILDREN_NUMBER,
                  })
                }
                decrement={() =>
                  dispatch({
                    type: SearchActions.DECREMENT_CHILDREN_NUMBER,
                  })
                }
                value={children}
                minValue={0}
                maxValue={8}
              />
            </Row>
            <Row>
              <RowLeftSide>
                <StyledIcon src={infant} />
                <div>
                  <StyledText>Infants</StyledText>
                  <UnderText>Under 2</UnderText>
                </div>
              </RowLeftSide>
              <Stepper
                increment={() =>
                  dispatch({
                    type: SearchActions.INCREMENT_INFANTS_NUMBER,
                  })
                }
                decrement={() =>
                  dispatch({
                    type: SearchActions.DECREMENT_INFANTS_NUMBER,
                  })
                }
                value={infants}
                minValue={0}
                maxValue={1}
              />
            </Row>
            <SectionTitle>
              <p>Cabin class</p>
            </SectionTitle>

            <RadioWrapper role="group">
              {cabinClassArray.map((cabin, index) => (
                <ReStyledRadioLabel key={index}>
                  <StyledRadioInput
                    type="radio"
                    name="cabin"
                    value={cabin.value}
                    defaultChecked={cabinClass.code === cabin.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: SearchActions.SET_CABIN_CLASS,
                        payload: {
                          code: e.currentTarget.value,
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
