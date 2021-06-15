import styled from "styled-components";
import formHero from "../../assets/formHero.jpg";

import { Logo } from "../Logo/Logo";

export const Wrapper = styled.div`
  position: relative;
  background-image: url(${formHero});
  background-size: cover;
  height: 33vh;
  width: 100%;
  margin-bottom: 30px;
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
