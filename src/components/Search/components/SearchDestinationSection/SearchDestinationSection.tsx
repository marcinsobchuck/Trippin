import React, { useEffect, useRef, useState } from "react";
import {
  ListWrapper,
  Item,
  StyledLogo,
  SidebarWrapper,
  Wrapper,
  SidebarNavbar,
  Menu,
  MenuItem,
  CurrencyIndicator,
  LanguageFlag,
  CurrencyIcon,
  AccountIcon,
  ArrowIcon,
  BurgerMenuIcon,
  BurgerMenuIconWrapper,
} from "./SearchDestinationSection.styled";
import { useTransition, animated } from "react-spring";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "../../../../enums/breakpoint.enum";
import { RecommendedPlacesMap } from "../../../../enums/backgroundImages.enum";
import { recommendedPlacesArray } from "./config";
import { Colors } from "../../../../enums/colors.enum";
import landscapeBudapest from "src/assets/images/landscapeBudapest.jpg";
import portraitBudapest from "src/assets/images/portraitBudapest.jpg";
import { SearchForm } from "../SearchForm/SearchForm";
import { useTranslation } from "react-i18next";
import { RegionalSettingsModal } from "src/components/RegionalSettingsModal/RegionalSettingsModal";
import { useAuth } from "src/hooks/useAuth";
import { useOnClickOutside } from "src/hooks/useClickOutside";
import arrow from "src/assets/images/arrow.svg";
import user from "src/assets/images/user.svg";
import burger from "src/assets/images/burger.svg";
import { AccountInformationModal } from "src/components/AccountInformationModal/AccountInformationModal";
import { DrawerMenu } from "../DrawerMenu/DrawerMenu";
import { RecommendedPlace } from "src/shared/types";

export const SearchDestinationSection: React.FC = () => {
  const isTablet = useMediaQuery({
    query: `${Breakpoint.Tablet}`,
  });

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const [currentRecommendedPlace, setCurrentRecommendedPlace] =
    useState<RecommendedPlace>(() => recommendedPlacesArray[5]);
  const [
    hasCurrentRecommendedPlacesChanged,
    setHasCurrentRecommendedPlacesChanged,
  ] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<any>(() =>
    isTablet ? landscapeBudapest : portraitBudapest
  );
  const [initialised, setInitialised] = useState<boolean>(false);
  const [showRegionalSettingsModal, setShowRegionalSettingsModal] =
    useState<boolean>(false);
  const [showAccountInfoModal, setShowAccountInfoModal] =
    useState<boolean>(false);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState<boolean>(false);

  const { regionalSettings } = useAuth();

  const backgroundTransition = useTransition(currentUrl, {
    key: currentUrl,
    from: { opacity: initialised ? 0 : 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 2000 },
  });

  const handleClickOnPlace = (
    event: React.MouseEvent<HTMLLIElement>,
    place: RecommendedPlace
  ) => {
    setCurrentRecommendedPlace({
      id: place.id,
      place: place.place,
      place_key: place.place_key,
      inputText: event.currentTarget.innerText,
    });
    setHasCurrentRecommendedPlacesChanged(true);
  };

  useEffect(() => {
    setInitialised(true);
  }, []);

  useEffect(() => {
    if (isTablet) {
      setCurrentUrl(
        RecommendedPlacesMap.get(currentRecommendedPlace.place)?.landscape
      );
    } else {
      setCurrentUrl(
        RecommendedPlacesMap.get(currentRecommendedPlace.place)?.portrait
      );
    }
  }, [currentRecommendedPlace, isTablet]);

  const { t } = useTranslation();

  const handleRegionalSettingsClick = () => {
    setShowRegionalSettingsModal((prevState) => !prevState);
    setShowAccountInfoModal(false);
  };
  const handleAccountInfoClick = () => {
    setShowAccountInfoModal((prevState) => !prevState);
  };

  const menuRef = useRef(null);
  const settingsModalRef = useRef(null);

  const handleBurgerClick = () => setIsDrawerMenuOpen((prev) => !prev);

  useOnClickOutside(menuRef, () => setShowAccountInfoModal(false));
  useOnClickOutside(settingsModalRef, () =>
    setShowRegionalSettingsModal(false)
  );

  return (
    <Wrapper>
      {backgroundTransition((style, item) => (
        <animated.div
          style={{
            ...style,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: -10,
            backgroundImage: `url(${item})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "opacity",
          }}
        />
      ))}
      {!isTabletS && (
        <BurgerMenuIconWrapper onClick={handleBurgerClick}>
          <BurgerMenuIcon src={burger} />
        </BurgerMenuIconWrapper>
      )}

      <DrawerMenu
        isOpen={isDrawerMenuOpen}
        setIsDrawerMenuOpen={setIsDrawerMenuOpen}
        setShowRegionalSettingsModal={setShowRegionalSettingsModal}
      />

      <RegionalSettingsModal
        setShowRegionalSettingsModal={setShowRegionalSettingsModal}
        showRegionalSettingsModal={showRegionalSettingsModal}
      />

      <SidebarWrapper>
        <SidebarNavbar>
          <StyledLogo color={Colors.White} />

          <BurgerMenuIconWrapper onClick={handleBurgerClick}>
            <BurgerMenuIcon src={burger} />
          </BurgerMenuIconWrapper>

          <Menu ref={menuRef}>
            <MenuItem id="account" onClick={handleAccountInfoClick}>
              <ArrowIcon src={arrow} />
              <AccountIcon src={user} />
            </MenuItem>
            <MenuItem id="settings" onClick={handleRegionalSettingsClick}>
              <CurrencyIcon
                src={regionalSettings.currency.currencyIcon}
                alt="currency icon"
              />
              <CurrencyIndicator>
                {regionalSettings.currency.currencyCode}
              </CurrencyIndicator>
              <LanguageFlag src={regionalSettings.language.flag} alt="flag" />
            </MenuItem>
            <AccountInformationModal
              showAccountInfoModal={showAccountInfoModal}
            />
          </Menu>
        </SidebarNavbar>

        <ListWrapper>
          {recommendedPlacesArray.map((place) => (
            <Item
              isActive={currentRecommendedPlace.place === place.place}
              key={place.id}
              onClick={(event) => handleClickOnPlace(event, place)}
              id={place.id}
            >
              {t(place.place_key)}
            </Item>
          ))}
        </ListWrapper>
      </SidebarWrapper>
      <SearchForm
        currentRecommendedPlace={currentRecommendedPlace}
        hasCurrentRecommendedPlacesChanged={hasCurrentRecommendedPlacesChanged}
        setHasCurrentRecommendedPlacesChanged={
          setHasCurrentRecommendedPlacesChanged
        }
      />
    </Wrapper>
  );
};
