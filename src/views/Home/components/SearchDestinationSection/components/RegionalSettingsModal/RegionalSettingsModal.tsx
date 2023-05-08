import React, { useRef } from 'react';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { animated } from 'react-spring';

import { Icon } from 'src/components/Icon/Icon';
import { RegionalSettingsTypes } from 'src/context/AuthContext.types';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useOnClickOutside } from 'src/hooks/useClickOutside';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { useModalAnimation } from 'src/hooks/useModalAnimation';
import i18n from 'src/i18n';

import { CurrencySelect } from '../Select/CurrencySelect';
import { LanguageSelect } from '../Select/LanguageSelect';

import {
  IconWrapper,
  ModalOverlay,
  ModalTitle,
  StyledButton,
  StyledForm,
} from './RegionalSettingsModal.styled';
import { RegionalSettingsModalProps } from './RegionalSettingsModal.types';

export const RegionalSettingsModal: React.FC<RegionalSettingsModalProps> = ({
  showRegionalSettingsModal,
  setShowRegionalSettingsModal,
}) => {
  const {
    regionalSettings: { language, currency },
    setRegionalSettings,
  } = useAuth();

  const initialValues: RegionalSettingsTypes = {
    language,
    currency,
  };

  const { changeLanguage } = i18n;

  const handleCloseModal = () => setShowRegionalSettingsModal(false);

  const regionalSettingsModalTransition = useModalAnimation(showRegionalSettingsModal);

  const handleSubmit = (values: RegionalSettingsTypes) => {
    changeLanguage(values.language.languageCode);
    setRegionalSettings({ language: values.language, currency: values.currency });

    handleCloseModal();
  };

  const ref = useRef(null);
  const { t } = useTranslation();

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
                position: 'fixed',
                zIndex: 3000,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                visibility: 'visible',
              }}
            >
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <StyledForm ref={ref}>
                  <IconWrapper onClick={handleCloseModal}>
                    <Icon name="closeIcon" height={16} width={16} fill={Colors.DarkerBlue} />
                  </IconWrapper>
                  <ModalTitle>{t('views.home.modals.regionalSettings')}</ModalTitle>

                  <LanguageSelect name="language" />
                  <CurrencySelect name="currency" />
                  <StyledButton type="submit" variant="quaternary">
                    {t('views.home.buttons.save')}
                  </StyledButton>
                </StyledForm>
              </Formik>
            </animated.div>
          ),
      )}
    </ModalOverlay>
  );
};
