import { Colors } from "src/enums/colors.enum";
import { FontSize } from "src/enums/fontSize.enum";
import styled from "styled-components";

export const CustomRadioInput = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 50%;
  transition: 0.3s;
  ::after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${Colors.DarkerBlue};
  }
`;

export const StyledRadioLabel = styled.label`
  padding-left: 26px;
  position: relative;
  display: flex;
  font-size: ${FontSize.Small};
  margin-bottom: 4px;
  cursor: pointer;

  :hover ${CustomRadioInput} {
    background-color: ${Colors.Gray};
  }
`;

export const StyledRadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  :checked ~ ${CustomRadioInput}::after {
    display: block;
  }

  :checked ~ ${CustomRadioInput} {
    background-color: ${Colors.White};
  }
`;
