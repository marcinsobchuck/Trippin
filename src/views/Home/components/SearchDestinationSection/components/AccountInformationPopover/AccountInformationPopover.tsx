import React from 'react';

import { useHistory } from 'react-router-dom';
import { animated } from 'react-spring';

import { Routes } from 'src/enums/routes.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useModalAnimation } from 'src/hooks/useModalAnimation';
import { menuItems } from 'src/shared/config';

import { StyledText, Wrapper } from './AccountInformationPopover.styled';

export const AccountInformationPopover: React.FC<{
  showAccountInfoPopover: boolean;
}> = ({ showAccountInfoPopover }) => {
  const { logout, currentUser } = useAuth();

  const history = useHistory();

  const handleClick = () => {
    if (currentUser) {
      logout();
    }

    history.push('/entry');
  };

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
              <StyledText key={menuItem.text} $isDisabled={!currentUser} to={menuItem.route}>
                {menuItem.text}
              </StyledText>
            ))}
            <StyledText to={Routes.Entry} onClick={handleClick}>
              {currentUser ? 'Sign out' : 'Sign in'}
            </StyledText>
          </Wrapper>
        </animated.div>
      ),
  );
};
