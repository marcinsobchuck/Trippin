import React from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { animated } from 'react-spring';

import { Routes } from 'src/enums/routes.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useModalAnimation } from 'src/hooks/useModalAnimation';

import { menuItems } from '../../config';

import { StyledText, Wrapper } from './AccountInformationPopover.styled';
import { AccountInformationPopoverProps } from './AccountInformationPopover.types';

export const AccountInformationPopover: React.FC<AccountInformationPopoverProps> = ({
  showAccountInfoPopover,
}) => {
  const { logout, currentUser } = useAuth();

  const history = useHistory();

  const handleClick = () => {
    if (currentUser) {
      logout();
    }

    history.push('/entry');
  };

  const { t } = useTranslation();

  const accountInformationPopoverTransition = useModalAnimation(showAccountInfoPopover);

  return accountInformationPopoverTransition(
    (styles, item) =>
      item && (
        <animated.div
          style={{
            ...styles,
            position: 'absolute',
            zIndex: 2,
            top: 40,
            left: 0,
          }}
        >
          <Wrapper>
            {menuItems.map((menuItem) => (
              <StyledText key={menuItem.menu_key} $isDisabled={!currentUser} to={menuItem.route}>
                {t(menuItem.menu_key)}
              </StyledText>
            ))}
            <StyledText to={Routes.Entry} onClick={handleClick}>
              {currentUser ? t('views.home.menu.signOut') : t('views.home.menu.signIn')}
            </StyledText>
          </Wrapper>
        </animated.div>
      ),
  );
};
