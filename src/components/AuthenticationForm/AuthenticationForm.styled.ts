import styled from "styled-components";
import { Colors } from "../../enums/colors.enum";
import { FontSize } from "../../enums/fontSize.enum";
import { FontWeight } from "../../enums/fontWeight.enum";
import { Form } from "formik";
import { Button, RedirectButton } from "../../styles/Button.styled";
import { Breakpoint } from "../../enums/breakpoint.enum";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  color: ${Colors.DarkBlue};
  font-size: 36px;
  font-weight: ${FontWeight.Medium};
  text-align: center;
  margin-bottom: 30px;
  @media ${Breakpoint.Desktop} {
    font-size: ${FontSize.BigXXL};
    font-weight: ${FontWeight.Bold};
    margin-bottom: 60px;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${Breakpoint.Desktop} {
    width: 100%;
    max-width: 360px;
  }
`;

export const ActionText = styled.div`
  font-size: ${FontSize.Small};
  color: ${Colors.DarkBlue};
  margin-bottom: 6px;
  margin-top: 30px;
  text-align: center;
  span {
    margin-left: 3px;
    color: ${Colors.DarkerBlue};
    font-weight: ${FontWeight.SemiBold};
    text-decoration: underline;
    cursor: pointer;
  }
  @media ${Breakpoint.Desktop} {
    display: none;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 22px;

  span {
    text-align: center;
    font-size: ${FontSize.Small};
    font-weight: ${FontWeight.Medium};
    margin: 10px 0;
  }

  @media ${Breakpoint.Desktop} {
    margin-top: 80px;
  }
`;

export const StyledButton = styled(Button)`
  margin-left: 3px;
`;

export const StyledRedirectButton = styled(RedirectButton)`
  margin-top: 12px;
  @media ${Breakpoint.Desktop} {
    margin-top: 24px;
  }
`;

export const Error = styled.span`
  font-size: ${FontSize.Small};
  color: ${Colors.Red};
  text-align: center;
`;
