import React from "react";
import logoIcon from "../../assets/logo.svg";
import { LogoWrapper, LogoIcon, LogoText } from "./Logo.styled";
import { Props } from "./Logo.types";

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <LogoWrapper className={className}>
      <LogoIcon src={logoIcon} />
      <LogoText>TRIPPIN</LogoText>
    </LogoWrapper>
  );
};
