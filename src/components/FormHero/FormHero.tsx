import React from "react";

import { Wrapper, StyledLogo, Triangle, ImageWrapper } from "./FormHero.styled";
import triangle from "src/assets/images/triangle.png";

export const FormHero: React.FC = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Triangle src={triangle} />
      </ImageWrapper>
      <StyledLogo />
    </Wrapper>
  );
};
