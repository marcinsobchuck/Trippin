import styled from "styled-components";
import { Form } from "formik";
import { Colors } from "../../../../enums/colors.enum";
import { Breakpoint } from "../../../../enums/breakpoint.enum";

export const Wrapper = styled.div`
  background-color: ${Colors.BlackOpacity};
  border-radius: 6px;
  width: 100%;

  @media ${Breakpoint.TabletS} {
    margin: 0 30px;
    width: auto;
  }

  @media ${Breakpoint.Tablet} {
    width: 500px;
  }

  @media ${Breakpoint.DesktopXL} {
    width: auto;
  }
`;

export const StyledForm = styled(Form)`
  padding: 24px;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media ${Breakpoint.DesktopXL} {
    flex-direction: row;
  }
`;
