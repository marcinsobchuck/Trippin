import styled from "styled-components";
import formHero from "../../assets/formHero.jpg";
import { Breakpoint } from "../../enums/breakpoint.enum";

import { Logo } from "../Logo/Logo";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  position: relative;
  background-image: url(${formHero});
  background-size: cover;
  background-repeat: no-repeat;
  height: 25vh;
  width: 100%;
  margin-bottom: 30px;
  @media ${Breakpoint.Mobile} {
    background-position: center;
  }
  @media ${Breakpoint.TabletS} {
    background-position: 50% 70%;
  }
`;

export const StyledLogo = styled(Logo)`
  margin-bottom: 30px;
`;

export const Triangle = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 70px;
  width: 100%;
`;
