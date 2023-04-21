import styled from 'styled-components';

import { Colors } from 'src/enums/colors.enum';

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
