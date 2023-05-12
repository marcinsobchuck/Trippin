import React, { useRef, useState } from 'react';

import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useTransition } from 'react-spring';

import { Icon } from 'src/components/Icon/Icon';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useOnClickOutside } from 'src/hooks/useClickOutside';

import { RecommendedPlace, SearchFormTypes } from '../../types/types';

import { AccountInformationPopover } from './components/AccountInformationPopover/AccountInformationPopover';
import { DrawerMenu } from './components/DrawerMenu/DrawerMenu';
import { RegionalSettingsModal } from './components/RegionalSettingsModal/RegionalSettingsModal';
import { SearchForm } from './components/SearchForm/SearchForm';
import { recommendedPlacesArray } from './config';
import {
  AnimatedBackground,
  BurgerMenuIconWrapper,
  CurrencyIcon,
  CurrencyIndicator,
  Item,
  LanguageFlag,
  ListWrapper,
  Menu,
  MenuItem,
  SidebarNavbar,
  SidebarWrapper,
  StyledIcon,
  StyledLogo,
  Wrapper,
} from './SearchDestinationSection.styled';

export const SearchDestinationSection: React.FC = () => {
  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });
  const [currentRecommendedPlace, setCurrentRecommendedPlace] = useState<RecommendedPlace>(
    () => recommendedPlacesArray[4],
  );
  const [showRegionalSettingsModal, setShowRegionalSettingsModal] = useState<boolean>(false);
  const [showAccountInfoPopover, setShowAccountInfoPopover] = useState<boolean>(false);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState<boolean>(false);

  const menuRef = useRef(null);
  const settingsModalRef = useRef(null);
  const formRef = useRef<FormikProps<SearchFormTypes>>(null);

  const { regionalSettings } = useAuth();

  const { t } = useTranslation();

  const handleRegionalSettingsClick = () => {
    setShowRegionalSettingsModal((prevState) => !prevState);
  };
  const handleAccountInfoClick = () => {
    setShowAccountInfoPopover((prevState) => !prevState);
  };

  const handleClickOnPlace = (event: React.MouseEvent<HTMLLIElement>, place: RecommendedPlace) => {
    formRef.current?.setFieldValue('destination', {
      id: event.currentTarget.id,
      text: event.currentTarget.innerText,
    });
    setCurrentRecommendedPlace({
      ...place,
      inputText: event.currentTarget.innerText,
    });
  };

  const handleBurgerClick = () => setIsDrawerMenuOpen((prev) => !prev);

  useOnClickOutside(menuRef, () => setShowAccountInfoPopover(false));
  useOnClickOutside(settingsModalRef, () => setShowRegionalSettingsModal(false));

  const backgroundTransition = useTransition(currentRecommendedPlace.image, {
    key: currentRecommendedPlace.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <Wrapper id="search">
      {backgroundTransition((style, item) => (
        <AnimatedBackground $backgroundImage={item} style={style} />
      ))}
      {!isTabletS && (
        <BurgerMenuIconWrapper onClick={handleBurgerClick}>
          <Icon name="burgerIcon" width={24} height={24} fill={Colors.White} />
        </BurgerMenuIconWrapper>
      )}

      <DrawerMenu
        isOpen={isDrawerMenuOpen}
        setIsDrawerMenuOpen={setIsDrawerMenuOpen}
        setShowRegionalSettingsModal={setShowRegionalSettingsModal}
      />

      <SidebarWrapper>
        <SidebarNavbar>
          <StyledLogo color={Colors.White} />

          <BurgerMenuIconWrapper onClick={handleBurgerClick}>
            <Icon name="burgerIcon" width={24} height={24} fill={Colors.White} />
          </BurgerMenuIconWrapper>

          <Menu>
            <MenuItem ref={menuRef} id="account" onClick={handleAccountInfoClick}>
              <StyledIcon name="arrowIcon" height={26} width={26} color={Colors.White} />
              <Icon name="userIcon" height={24} width={24} fill={Colors.White} />
            </MenuItem>
            <MenuItem id="settings" onClick={handleRegionalSettingsClick}>
              <CurrencyIcon src={regionalSettings.currency.currencyIcon} alt="currency icon" />
              <CurrencyIndicator>{regionalSettings.currency.currencyCode}</CurrencyIndicator>
              <LanguageFlag src={regionalSettings.language.flag} alt="flag" />
            </MenuItem>
            <AccountInformationPopover showAccountInfoPopover={showAccountInfoPopover} />
          </Menu>
        </SidebarNavbar>

        <ListWrapper>
          {recommendedPlacesArray.map((place) => (
            <Item
              isActive={currentRecommendedPlace.id === place.id}
              key={place.id}
              onClick={(event) => handleClickOnPlace(event, place)}
              id={place.id}
            >
              {t(place.place_key)}
            </Item>
          ))}
        </ListWrapper>
      </SidebarWrapper>
      <SearchForm formRef={formRef} currentRecommendedPlace={currentRecommendedPlace} />
      <RegionalSettingsModal
        setShowRegionalSettingsModal={setShowRegionalSettingsModal}
        showRegionalSettingsModal={showRegionalSettingsModal}
      />
    </Wrapper>
  );
};
