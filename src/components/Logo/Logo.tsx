import React from "react";
import logoIcon from "../../assets/logo.svg";
import { LogoWrapper, LogoIcon, LogoText } from "./Logo.styled";
import { Props } from "./Logo.types";

export const Logo: React.FC<Props> = ({ className, color }) => {
  return (
    <LogoWrapper color={color} className={className}>
      <LogoIcon src={logoIcon} />
      <LogoText>TRIPPIN</LogoText>
    </LogoWrapper>
  );
};
