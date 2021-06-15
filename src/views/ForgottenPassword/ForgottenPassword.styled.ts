import styled from "styled-components";
import { FontSize } from "../../enums/fontSize.enum";
import { FontWeight } from "../../enums/fontWeight.enum";
import { AuthFormInput } from "../../components/AuthenticationFormInput/AuthFormInput";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.div`
  height: 170px;
`;

export const StyledAuthFormInput = styled(AuthFormInput)`
  margin-bottom: 0px;
  div,
  span {
    display: none;
  }
`;

export const Information = styled.p`
  font-size: ${FontSize.Regular};
  text-align: center;
  margin-top: 10px;
`;
