import styled from "styled-components";
import { FontSize } from "../../enums/fontSize.enum";
import { AuthFormInput } from "../../components/AuthenticationFormInput/AuthFormInput";
import { Button } from "../../styles/Button.styled";
import { Breakpoint } from "../../enums/breakpoint.enum";

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0px 20px;
  max-width: 320px;
  @media ${Breakpoint.Tablet} {
    max-width: 420px;
  }
`;

export const InputContainer = styled.div`
  height: 170px;
  width: 100%;
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

export const StyledButton = styled(Button)`
  margin-top: 40px;
`;
