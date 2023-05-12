import styled from 'styled-components';

import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

import { AuthFormInput } from '../../components/AuthenticationFormInput/AuthFormInput';
import { Breakpoint } from '../../enums/breakpoint.enum';
import { Colors } from '../../enums/colors.enum';
import { Button } from '../../styles/Button.styled';

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

export const StyledButton = styled(Button)`
  margin-top: 40px;
`;

export const ErrorStyled = styled.span`
  color: ${Colors.Red};
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Light};
`;

export const ErrorSpace = styled.div`
  visibility: hidden;
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Light};
`;
