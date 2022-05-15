import { Breakpoint } from "src/enums/breakpoint.enum";
import { Colors } from "src/enums/colors.enum";
import { FontSize } from "src/enums/fontSize.enum";
import { FontWeight } from "src/enums/fontWeight.enum";
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

export const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 86px;
  border-bottom: 1px solid ${Colors.Silver};
  background-color: ${Colors.White};
`;

export const HeadingText = styled.p`
  color: ${Colors.DarkBlue};
  font-size: ${FontSize.Medium};
  span {
    font-weight: ${FontWeight.SemiBold};
    font-size: ${FontSize.Big};
  }
`;
