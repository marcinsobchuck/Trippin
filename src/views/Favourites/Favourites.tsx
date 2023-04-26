import React from 'react';

import { useHistory } from 'react-router-dom';

import { Icon } from 'src/components/Icon/Icon';
import { Logo } from 'src/components/Logo/Logo';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';
import { FavouritesList } from 'src/views/Favourites/components/FavouritesList/FavouritesList';

import { Footer } from '../../components/Footer/Footer';

import {
  Arrow,
  ButtonText,
  ButtonWrapper,
  Email,
  Header,
  Heading,
  MainContentWrapper,
  UserInfoWrapper,
  Wrapper,
} from './Favourites.styled';

export const Favourites: React.FC = () => {
  const history = useHistory();

  const { currentUser } = useAuth();

  const handleButtonClick = () => history.goBack();
  return (
    <Wrapper>
      <Header>
        <ButtonWrapper onClick={handleButtonClick}>
          <Arrow name="arrowIcon" width={32} height={32} color={Colors.DeepDarkBlue} />
          <ButtonText>Go back</ButtonText>
        </ButtonWrapper>
        <Logo color={Colors.DeepDarkBlue} />
      </Header>
      <MainContentWrapper>
        <UserInfoWrapper>
          <Icon name="userIcon" width={36} height={36} color={Colors.Silver} />
          <Email>{currentUser?.email}</Email>
        </UserInfoWrapper>
        <Heading>Your trips</Heading>
        <FavouritesList />
      </MainContentWrapper>
      <Footer />
    </Wrapper>
  );
};
