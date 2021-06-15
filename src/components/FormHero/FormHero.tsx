import React from "react";

import { StyledLogo, Triangle, Wrapper } from "./FormHero.styled";
import triangle from "../../assets/triangle.png";

export const FormHero: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Triangle src={triangle} />
      </Wrapper>
      <StyledLogo />
    </>
  );
};
