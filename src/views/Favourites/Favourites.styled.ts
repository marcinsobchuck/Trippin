import styled from 'styled-components';

import svg from 'react-inlinesvg';

import { Icon } from 'src/components/Icon/Icon';
import { Boxshadow } from 'src/enums/boxShadow.enum';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 30px;
  padding: 10px 16px;
  border-bottom: 1px solid ${Colors.LightGray};
  box-shadow: ${Boxshadow.Boxshadow};

  @media ${Breakpoint.Desktop} {
    justify-content: center;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 3px;
  border-radius: 9px;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background-color: ${Colors.NiceGray};
  }
`;

export const ButtonText = styled.p`
  color: ${Colors.DeepDarkBlue};
`;

export const Arrow = styled(Icon)`
  transform: rotate(90deg);
`;

export const MainContentWrapper = styled.div`
  align-self: center;
  width: 100%;
  padding: 10px 16px;

  @media ${Breakpoint.Desktop} {
    max-width: 1024px;
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const UserIcon = styled(svg)`
  width: 36px;
  height: 36px;
  margin-right: 9px;
  fill: ${Colors.Silver};
`;

export const Email = styled.p`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.SemiBold};
  margin-left: 9px;
`;

export const Heading = styled.h2`
  font-size: ${FontSize.Big};
  color: ${Colors.DeepDarkBlue};
  font-weight: ${FontWeight.Bold};
  margin-bottom: 24px;
`;
