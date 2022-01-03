import { Colors } from "src/enums/colors.enum";
import { FontSize } from "src/enums/fontSize.enum";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Title = styled.p`
  font-size: ${FontSize.Regular};
  color: ${Colors.White};
`;

export const StyledInput = styled.input`
  margin-right: 6px;
`;

export const StyledLabel = styled.label`
  display: flex;
  font-size: ${FontSize.Small};
  color: ${Colors.White};
  cursor: pointer;
`;
