import React from 'react';

import triangle from 'src/assets/images/triangle.png';

import {
ImageWrapper,
StyledLogo, Triangle,   Wrapper, } from './FormHero.styled';

export const FormHero: React.FC = () => (
  <Wrapper>
    <ImageWrapper>
      <Triangle src={triangle} />
    </ImageWrapper>
    <StyledLogo />
  </Wrapper>
);
