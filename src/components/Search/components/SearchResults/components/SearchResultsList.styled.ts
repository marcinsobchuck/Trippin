import { Breakpoint } from "src/enums/breakpoint.enum";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  padding: 46px;
  width: 100%;

  @media ${Breakpoint.DesktopXL} {
    padding: 30px;
  }
`;
