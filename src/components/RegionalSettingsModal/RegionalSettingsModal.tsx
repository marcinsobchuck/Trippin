import React, { useRef } from "react";
import { CurrencySelect } from "./Select/CurrencySelect";
import {
  CloseIcon,
  IconWrapper,
  ModalOverlay,
  ModalTitle,
  StyledButton,
  StyledForm,
} from "./RegionalSettingsModal.styled";
import { Formik } from "formik";
import closeIcon from "src/assets/images/close.svg";
import i18n from "src/i18n";
import { useAuth } from "src/hooks/useAuth";
import { LanguageSelect } from "./Select/LanguageSelect";
import { useModalAnimation } from "src/hooks/useModalAnimation";
import { animated } from "react-spring";
import { useOnClickOutside } from "src/hooks/useClickOutside";
import { useLockBodyScroll } from "src/hooks/useLockBodyScroll";
import { initialValuesTypes } from "./RegionalSettingsModal.types";

export const RegionalSettingsModal: React.FC<{
  setShowRegionalSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  showRegionalSettingsModal: boolean;
}> = ({ showRegionalSettingsModal, setShowRegionalSettingsModal }) => {
  const {
    regionalSettings: { language, currency },
    setRegionalSettings,
  } = useAuth();

  const initialValues: initialValuesTypes = {
    language,
    currency,
  };

  const { changeLanguage } = i18n;

  const handleCloseModal = () => setShowRegionalSettingsModal(false);

  const regionalSettingsModalTransition = useModalAnimation(
    showRegionalSettingsModal
  );

  const handleSubmit = ({ language, currency }: initialValuesTypes) => {
    setRegionalSettings({ language, currency });
    changeLanguage(language.languageCode);
    handleCloseModal();
  };

  const ref = useRef(null);

  useOnClickOutside(ref, () => setShowRegionalSettingsModal(false));
  useLockBodyScroll(showRegionalSettingsModal);

  return (
    <ModalOverlay isOpen={showRegionalSettingsModal}>
      {regionalSettingsModalTransition(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                ...styles,
                position: "fixed",
                zIndex: 3000,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                visibility: "visible",
              }}
            >
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <StyledForm ref={ref}>
                  <IconWrapper onClick={handleCloseModal}>
                    <CloseIcon src={closeIcon} />
                  </IconWrapper>
                  <ModalTitle>Regional settings</ModalTitle>

                  <LanguageSelect name='language' />
                  <CurrencySelect name='currency' />
                  <StyledButton type='submit' variant='quaternary'>
                    Save
                  </StyledButton>
                </StyledForm>
              </Formik>
            </animated.div>
          )
      )}
    </ModalOverlay>
  );
};