import React from 'react';

import { useHistory } from 'react-router-dom';

import { Routes } from 'src/enums/routes.enum';

import { Icon } from '../Icon/Icon';

import { LogoText, LogoWrapper } from './Logo.styled';
import { LogoProps } from './Logo.types';

export const Logo: React.FC<LogoProps> = ({ className, color }) => {
  const { pathname } = window.location;

  const history = useHistory();

  const handleClick = () => pathname !== Routes.Home && history.push(Routes.Home);

  return (
    <LogoWrapper
      clickable={pathname !== Routes.Home}
      color={color}
      className={className}
      onClick={handleClick}
    >
      <Icon name="logoIcon" width={36} height={36} fill={color} />
      <LogoText>TRIPPIN</LogoText>
    </LogoWrapper>
  );
};
