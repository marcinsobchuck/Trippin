import { Link } from "react-router-dom";
import styled from "styled-components";
import { Breakpoint } from "../../enums/breakpoint.enum";
import { Colors } from "../../enums/colors.enum";
import { FontSize } from "../../enums/fontSize.enum";
import { FontWeight } from "../../enums/fontWeight.enum";
import { Button } from "../../styles/Button.styled";
import sideBarPhoto from "../../assets/sidebarphoto.jpg";

export const FormWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 0px 20px;
  max-width: 320px;
  overflow: hidden;
  @media ${Breakpoint.Tablet} {
    max-width: 420px;
  }
`;

export const StyledLink = styled(Link)`
  font-size: ${FontSize.Small};
  text-decoration: underline;
  font-weight: ${FontWeight.SemiBold};
  color: ${Colors.DarkerBlue};
  text-align: center;
`;

export const MobileWrapper = styled.div`
  @media ${Breakpoint.Desktop} {
    display: none;
  }
`;

export const DesktopWrapper = styled.div`
  display: none;
  @media ${Breakpoint.Desktop} {
    display: flex;
    height: 100vh;
    position: relative;
  }
`;

export const DesktopFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  width: 60%;
`;

export const SideAction = styled.div`
  position: relative;
  background-image: url(${sideBarPhoto});
  background-size: cover;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(
      190deg,
      rgba(0, 0, 0, 0),
      rgba(14, 9, 69, 0.9) 80.71%
    );
    background-size: cover;
    z-index: -1;
  }
`;

export const SideBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Heading = styled.h2`
  color: ${Colors.White};
  font-size: ${FontSize.BigXXL};
  font-weight: ${FontWeight.Bold};
  text-align: center;
`;

export const Description = styled.p`
  color: ${Colors.White};
  font-size: ${FontSize.Medium};
  font-weight: ${FontWeight.Light};
  margin: 60px 0;
  text-align: center;
`;

export const StyledButton = styled(Button)`
  border: 2px solid ${Colors.White};
  background-color: transparent;
`;