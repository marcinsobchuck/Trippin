import styled from 'styled-components';

import { Link } from 'react-scroll';

import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const ItemName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: calc(100% - 46px);
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding: 6px 0;
  min-height: 46px;
  text-align: center;
  background-color: ${Colors.DeepDarkBlueOpacity2};
  font-size: ${FontSize.Medium};
  font-weight: ${FontWeight.SemiBold};
  color: ${Colors.White};
  text-transform: uppercase;
  transition: 0.3s ease-in-out;
`;

export const TagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${Colors.DeepDarkBlueOpacity2};
  padding: 12px 6px;
  position: absolute;
  z-index: 11;
  width: 100%;
  bottom: 0;
  transform: translateY(100%);
  transition: 0.3s ease-in-out;
`;

export const StyledTag = styled.div`
  border-radius: 9px;
  border: 1px solid ${Colors.WhiteOpacity};
  background-color: ${Colors.DeepDarkBlue};
  color: ${Colors.White};
  font-size: ${FontSize.SmallXS};
  padding: 3px 6px;
  margin: 3px;
`;

export const ImageWrapper = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  :hover img {
    transform: scale(1.1);
  }

  :hover ${ItemName} {
    background-color: ${Colors.White};
    color: ${Colors.DeepDarkBlue};
    top: 0;
    bottom: 100%;
  }

  :hover ${TagsWrapper} {
    transform: translateY(0);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: 0.3s ease-in-out;
  }
`;

export const StyledImage = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
  height: 286px;
  object-fit: cover;
  object-position: center;
  transition: 0.3s ease-in-out;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${Colors.Silver};
  border-bottom: 1px solid ${Colors.White};
  border-right: 1px solid ${Colors.White};
  display: flex;
  justify-content: center;
  align-items: center;
`;
