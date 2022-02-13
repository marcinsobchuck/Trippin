import { Breakpoint } from "src/enums/breakpoint.enum";
import styled from "styled-components";
import { ImageWrapper } from "./TopDestinationsSideBarItem.styled";

export const Wrapper = styled.div`
  position: relative;
  display: none;

  @media ${Breakpoint.Desktop} {
    width: 33vw;
    display: flex;
    flex-direction: column;

    :hover ${ImageWrapper}:not(:hover) {
      filter: grayscale(100%);

      &::after {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
