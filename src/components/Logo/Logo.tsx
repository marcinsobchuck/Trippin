import React from "react";
import { useHistory } from "react-router-dom";
import logoIcon from "src/assets/images/logo.svg";
import { Routes } from "src/enums/routes.enum";
import { LogoWrapper, LogoIcon, LogoText } from "./Logo.styled";
import { LogoProps } from "./Logo.types";

export const Logo: React.FC<LogoProps> = ({ className, color }) => {
  const pathname = window.location.pathname;

  const history = useHistory();

  const handleClick = () =>
    pathname !== Routes.Home && history.push(Routes.Home);

  return (
    <LogoWrapper
      clickable={pathname !== Routes.Home}
      color={color}
      className={className}
      onClick={handleClick}
    >
      <LogoIcon src={logoIcon} />
      <LogoText>TRIPPIN</LogoText>
    </LogoWrapper>
  );
};
