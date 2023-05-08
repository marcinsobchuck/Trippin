import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';

import { ImageWrapper } from '../TopDestinationSidebarItem/TopDestinationsSidebarItem.styled';

export const Wrapper = styled.div`
  position: relative;

  @media ${Breakpoint.Desktop} {
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
