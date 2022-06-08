import { Colors } from "src/enums/colors.enum";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  /* padding: 30px 12px; */
  background-color: ${Colors.OtherGray};
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
