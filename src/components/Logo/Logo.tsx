import React from "react";
import logoIcon from "src/assets/images/logo.svg";
import { LogoWrapper, LogoIcon, LogoText } from "./Logo.styled";
import { LogoProps } from "./Logo.types";

export const Logo: React.FC<LogoProps> = ({ className, color }) => {
  return (
    <LogoWrapper color={color} className={className}>
      <LogoIcon src={logoIcon} />
      <LogoText>TRIPPIN</LogoText>
    </LogoWrapper>
  );
};
