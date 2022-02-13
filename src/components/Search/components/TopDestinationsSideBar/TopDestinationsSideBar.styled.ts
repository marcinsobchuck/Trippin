import { Breakpoint } from "src/enums/breakpoint.enum";
import styled from "styled-components";
import { ImageWrapper } from "./TopDestinationsSideBarItem.styled";

export const Wrapper = styled.div<{ height?: number }>`
  display: none;

  @media ${Breakpoint.Desktop} {
    width: 33vw;
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    height: ${({ height }) => (height ? `${height}px` : "fit-content")};

    :hover ${ImageWrapper}:not(:hover) {
      filter: grayscale(100%);

      &::after {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
