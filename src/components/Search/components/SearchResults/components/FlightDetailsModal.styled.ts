import { Colors } from "src/enums/colors.enum";
import { FontSize } from "src/enums/fontSize.enum";
import { FontWeight } from "src/enums/fontWeight.enum";
import svg from "react-inlinesvg";
import styled from "styled-components";
import { Breakpoint } from "src/enums/breakpoint.enum";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: white;
  height: 100vh;
  width: 100vw;

  @media ${Breakpoint.TabletS} {
    margin: 30px 0;
    position: relative;
    width: 600px;
    border-radius: 9px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px;
  width: 32px;
  border-radius: 6px;
  transition: 0.2s;
  :hover {
    background-color: ${Colors.Silver};
  }
`;

export const CloseIcon = styled(svg)`
  fill: ${Colors.DarkerBlue};
  height: 16px;
  width: 16px;
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid ${Colors.Silver};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px;
  font-size: ${FontSize.Medium};
  color: ${Colors.DeepDarkBlue};
  font-weight: ${FontWeight.SemiBold};
`;

export const MainContent = styled.div`
  height: 600px;
  background-color: ${Colors.LightGray};
  overflow-y: auto;
  flex-grow: 1;
`;

export const RouteHeader = styled.div`
  padding: 30px 30px 16px;
  border-bottom: 1px solid ${Colors.Silver};
  display: flex;
  justify-content: space-between;

  p {
    color: ${Colors.DarkBlue};
    font-weight: ${FontWeight.Medium};
  }
`;

export const RoutesWrapper = styled.div`
  padding: 30px 30px 0;
  margin-bottom: 30px;
`;

export const ModalRoute = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid ${Colors.NiceGray};
  background-color: ${Colors.White};
  padding: 9px 16px;
`;

export const Layover = styled.div`
  margin: 16px 0;
  font-size: ${FontSize.SmallXS};
  text-align: center;

  i {
    margin-right: 6px;
  }
`;

export const StyledNumber = styled.div`
  font-size: ${FontSize.SmallXS};
  color: ${Colors.LightBlue};
  border-right: 1px solid ${Colors.NiceGray};
  padding-right: 16px;
`;

export const RouteDetails = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`;

export const RouteDetailRow = styled.div`
  display: flex;
  line-height: 18px;
  font-size: ${FontSize.Small};
`;

export const StyledTime = styled.div`
  font-weight: ${FontWeight.SemiBold};
  width: 46px;
`;

export const AdditionalInfo = styled.div`
  margin-top: 6px;
  p {
    font-size: ${FontSize.SmallXS};
    color: ${Colors.LightBlue};
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  border-top: 1px solid ${Colors.Silver};
  padding: 30px;
`;
