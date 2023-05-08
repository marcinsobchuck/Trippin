import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  background-color: ${Colors.OtherGray};
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const TopDestinationsWrapper = styled.div`
  display: none;
  @media ${Breakpoint.Desktop} {
    display: block;
    width: 33vw;
  }
`;

export const Heading = styled.div`
  display: none;
  @media ${Breakpoint.Desktop} {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 11;
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 92px;
    border-bottom: 1px solid ${Colors.Silver};
    background-color: ${Colors.White};

    p {
      text-transform: uppercase;
    }

    span {
      color: ${Colors.DeepDarkBlue};
      font-weight: ${FontWeight.Bold};
      font-size: ${FontSize.Medium};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
`;

export const HeadingText = styled.p`
  font-weight: ${FontWeight.Medium};
  font-size: ${FontSize.Small};
  color: ${Colors.DarkerBlue};
  border-bottom: 1px solid ${Colors.Silver};
  margin-bottom: 6px;
`;
