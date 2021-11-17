import React, { useRef } from "react";
import {
  CloseIcon,
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
} from "./DrawerMenu.styled";
import close from "src/assets/images/close.svg";
import { useOnClickOutside } from "src/hooks/useClickOutside";
import { useAuth } from "src/hooks/useAuth";
import signin from "src/assets/images/signin.png";
import signout from "src/assets/images/signout.png";
import { useHistory } from "react-router-dom";
import { Footer } from "src/components/Footer/Footer";
import { useLockBodyScroll } from "src/hooks/useLockBodyScroll";
import { menuItems } from "src/shared/config";
import { DrawerMenuProps } from "./DrawerMenu.types";

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
      return;
    }
    history.push("/entry");
  };

  useLockBodyScroll(isOpen);

  return (
    <>
      <Overlay isOpen={isOpen} />
      <Wrapper ref={wrapperRef} isOpen={isOpen}>
        <IconWrapper onClick={() => setIsDrawerMenuOpen(false)}>
          <CloseIcon src={close} />
        </IconWrapper>
        <MenuItemsWrapper>
          <RegionalSettingsMenuItem
            onClick={() => {
              setIsDrawerMenuOpen(false);
              setShowRegionalSettingsModal(true);
            }}
          >
            <p>Settings</p>
            <CurrentSettings>
              <StyledImg src={regionalSettings.currency.currencyIcon} alt="" />
              <p>{regionalSettings.currency.currencyCode}</p>
              <StyledImg src={regionalSettings.language.flag} alt="flag" />
            </CurrentSettings>
          </RegionalSettingsMenuItem>
          <LinksWrapper>
            {menuItems.map((item) => (
              <MenuItem
                key={item.text}
                $isDisabled={!currentUser}
                to={item.route}
              >
                <ItemText>{item.text}</ItemText>
              </MenuItem>
            ))}
          </LinksWrapper>
          <RegionalSettingsMenuItem onClick={handleAuthAction}>
            <p>{currentUser ? "Sign out" : "Sign in"}</p>
            <StyledImg src={currentUser ? signout : signin} />
          </RegionalSettingsMenuItem>
        </MenuItemsWrapper>
        <Footer />
      </Wrapper>
    </>
  );
};
