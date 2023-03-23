import styled from "styled-components";

import { Blurhash } from "react-blurhash";

export const ImageWrapper = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

export const StyledBlurhash = styled(Blurhash)`
  z-index: 20;
  position: absolute !important;
  top: 0;
  left: 0;
`;
