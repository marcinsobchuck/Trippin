import styled from "styled-components";
import { Colors } from "../../enums/colors.enum";
import { FontSize } from "../../enums/fontSize.enum";
import { FontWeight } from "../../enums/fontWeight.enum";
import { Form } from "formik";

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
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  padding: 0px 12px;
  width: 100%;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
