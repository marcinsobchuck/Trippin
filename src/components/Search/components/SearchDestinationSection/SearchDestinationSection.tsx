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
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "../../../../enums/breakpoint.enum";
import { Colors } from "../../../../enums/colors.enum";

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
import { FormikProps } from "formik";
import { SearchFormInitialValues } from "../SearchForm/SearchForm.types";
import { recommendedPlacesArray } from "./config";
import { RecommendedPlace } from "src/shared/types";
import { usePhotos } from "src/apiServices/hooks/usePhotos";
import { PhotosParameters } from "src/apiServices/types/unsplashApi.types";
import { OptimizedImage } from "src/components/OptimizedImage/OptimizedImage";

export const SearchDestinationSection: React.FC = () => {
  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });
  const [currentRecommendedPlace, setCurrentRecommendedPlace] =
    useState<RecommendedPlace>(() => recommendedPlacesArray[3]);
  const [showRegionalSettingsModal, setShowRegionalSettingsModal] =
    useState<boolean>(false);
  const [showAccountInfoModal, setShowAccountInfoModal] =
    useState<boolean>(false);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState<boolean>(false);

  const { regionalSettings } = useAuth();

  const photoParameters: PhotosParameters = {
    query: currentRecommendedPlace.place,
    per_page: 1,
    orientation: "landscape",
  };
  const { data, isFetching } = usePhotos(photoParameters);

  const photo = data?.data.results[0];

  useEffect(() => {
    console.log(photo);
  }, [photo]);

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
  const formRef = useRef<FormikProps<SearchFormInitialValues>>(null);

  const handleClickOnPlace = (
    event: React.MouseEvent<HTMLLIElement>,
    place: RecommendedPlace
  ) => {
    formRef.current?.setFieldValue("destination", {
      id: event.currentTarget.id,
      text: event.currentTarget.innerText,
    });
    setCurrentRecommendedPlace({
      ...place,
      inputText: event.currentTarget.innerText,
    });
  };

  const handleBurgerClick = () => setIsDrawerMenuOpen((prev) => !prev);

  useOnClickOutside(menuRef, () => setShowAccountInfoModal(false));
  useOnClickOutside(settingsModalRef, () =>
    setShowRegionalSettingsModal(false)
  );

  return (
    <>
      <OptimizedImage image={photo} isFetching={isFetching} />
      <Wrapper>
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

        <SidebarWrapper>
          <SidebarNavbar>
            <StyledLogo color={Colors.White} />

            <BurgerMenuIconWrapper onClick={handleBurgerClick}>
              <BurgerMenuIcon src={burger} />
            </BurgerMenuIconWrapper>

            <Menu ref={menuRef}>
              <MenuItem id='account' onClick={handleAccountInfoClick}>
                <ArrowIcon src={arrow} />
                <AccountIcon src={user} />
              </MenuItem>
              <MenuItem id='settings' onClick={handleRegionalSettingsClick}>
                <CurrencyIcon
                  src={regionalSettings.currency.currencyIcon}
                  alt='currency icon'
                />
                <CurrencyIndicator>
                  {regionalSettings.currency.currencyCode}
                </CurrencyIndicator>
                <LanguageFlag src={regionalSettings.language.flag} alt='flag' />
              </MenuItem>

              <AccountInformationModal
                showAccountInfoModal={showAccountInfoModal}
              />
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
        <SearchForm
          formRef={formRef}
          currentRecommendedPlace={currentRecommendedPlace}
        />
        <RegionalSettingsModal
          setShowRegionalSettingsModal={setShowRegionalSettingsModal}
          showRegionalSettingsModal={showRegionalSettingsModal}
        />
      </Wrapper>
    </>
  );
};
