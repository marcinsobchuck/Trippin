import styled from "styled-components";
import { Form } from "formik";
import { Colors } from "../../enums/colors.enum";
import { Breakpoint } from "../../enums/breakpoint.enum";

export const Wrapper = styled.div`
  background-color: ${Colors.BlackOpacity};
  border-radius: 3px;
  width: 100%;
  margin: 0px 30px;

  @media ${Breakpoint.TabletS} {
    width: 62vw;
  }

  @media ${Breakpoint.Desktop} {
    width: 600px;
  }
`;

export const StyledForm = styled(Form)`
  padding: 24px;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media ${Breakpoint.Desktop} {
    flex-direction: row;
  }
`;
