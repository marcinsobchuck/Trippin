import styled, { css } from "styled-components";

import { Link } from "react-router-dom";
import { FontSize } from "../enums/fontSize.enum";
import { Colors } from "../enums/colors.enum";
import { FontWeight } from "../enums/fontWeight.enum";

type ButtonVariants = "primary" | "secondary" | "tertiary" | "quaternary";

interface StyledButtonProps {
  width?: number;
  variant: ButtonVariants;
}

const ButtonStyles = {
  primary: css`
    font-size: ${FontSize.Regular};
    position: relative;
    background-color: ${Colors.DarkerBlue};
    font-weight: ${FontWeight.Medium};
    color: ${Colors.White};
    border: 2px solid transparent;
    z-index: 1;
    padding: 10px 20px;

    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${Colors.White};
      z-index: -1;
      transform: scaleX(0);
      transform-origin: left;
      transition: 0.2s ease-in-out;
    }
    :hover::before {
      transform: scaleX(1);
    }
    :hover {
      color: ${Colors.DarkerBlue};
    }
  `,
  secondary: css`
    color: ${Colors.DarkerBlue};
    border: 2px solid ${Colors.DarkerBlue};
    border-radius: 30px;
    padding: 6px 0px;
    font-size: ${FontSize.Small};
    background-color: transparent;
  `,
  tertiary: css`
    font-size: ${FontSize.Small};
    text-decoration: underline;
    font-weight: ${FontWeight.SemiBold};
    color: ${Colors.DarkerBlue};
    text-align: center;
    background-color: transparent;
  `,
  quaternary: css`
    font-size: ${FontSize.Big};
    font-weight: ${FontWeight.SemiBold};
    color: ${Colors.White};
    background-color: ${Colors.LightBlue};
    border-radius: 3px;
    padding: 8px 24px;
  `,
};

const getSharedStyles = (width?: number) => css`
  cursor: pointer;
  text-align: center;
  transition: 0.2s ease-in-out;
  width: ${width ? `${width}px` : "auto"};
`;

export const Button = styled.button<StyledButtonProps>`
  ${({ width }) => getSharedStyles(width)};
  ${({ variant }) => ButtonStyles[variant]}
`;

export const RedirectButton = styled(Link)<StyledButtonProps>`
  ${({ width }) => getSharedStyles(width)};
  ${({ variant }) => ButtonStyles[variant]}
  display: block;
`;
