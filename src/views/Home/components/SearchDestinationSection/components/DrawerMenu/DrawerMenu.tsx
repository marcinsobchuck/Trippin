import React, { useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Footer } from 'src/components/Footer/Footer';
import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useOnClickOutside } from 'src/hooks/useClickOutside';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { menuItems } from 'src/shared/config';

import {
  CurrentSettings,
  IconWrapper,
  ItemText,
  LinksWrapper,
  MenuItem,
  MenuItemsWrapper,
  Overlay,
  RegionalSettingsMenuItem,
  StyledImg,
  Wrapper,
} from './DrawerMenu.styled';
import { DrawerMenuProps } from './DrawerMenu.types';

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  setIsDrawerMenuOpen,
  setShowRegionalSettingsModal,
}) => {
  const wrapperRef = useRef(null);

  const { logout, regionalSettings, currentUser } = useAuth();

  useOnClickOutside(wrapperRef, () => setIsDrawerMenuOpen(false));

  const history = useHistory();

  const handleAuthAction = () => {
    if (currentUser) {
      logout();
    }
    history.push('/entry');
  };

  const { t } = useTranslation();

  useLockBodyScroll(isOpen);

  return (
    <>
      <Overlay isOpen={isOpen} />
      <Wrapper ref={wrapperRef} isOpen={isOpen}>
        <IconWrapper onClick={() => setIsDrawerMenuOpen(false)}>
          <Icon name="closeIcon" width={24} height={24} fill={Colors.White} />
        </IconWrapper>
        <MenuItemsWrapper>
          <RegionalSettingsMenuItem
            onClick={() => {
              setIsDrawerMenuOpen(false);
              setShowRegionalSettingsModal(true);
            }}
          >
            <p>{t('views.home.menu.settings')}</p>
            <CurrentSettings>
              <StyledImg src={regionalSettings.currency.currencyIcon} alt="currency icon" />
              <p>{regionalSettings.currency.currencyCode}</p>
              <StyledImg src={regionalSettings.language.flag} alt="flag" />
            </CurrentSettings>
          </RegionalSettingsMenuItem>
          <LinksWrapper>
            {menuItems.map((item) => (
              <MenuItem key={item.menu_key} $isDisabled={!currentUser} to={item.route}>
                <ItemText>{t(item.menu_key)}</ItemText>
              </MenuItem>
            ))}
          </LinksWrapper>
          <RegionalSettingsMenuItem onClick={handleAuthAction}>
            <p>{currentUser ? t('views.home.menu.signOut') : t('views.home.menu.signIn')}</p>
            <Icon name={currentUser ? 'signOutImage' : 'signInImage'} />
          </RegionalSettingsMenuItem>
        </MenuItemsWrapper>
        <Footer />
      </Wrapper>
    </>
  );
};
