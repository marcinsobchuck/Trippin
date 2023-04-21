import React from 'react';

import { useHistory } from 'react-router-dom';

import rarrow from 'src/assets/images/arrow.svg';
import user from 'src/assets/images/user.svg';

import { Logo } from 'src/components/Logo/Logo';
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
  UserIcon,
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
          <Arrow src={rarrow} />
          <ButtonText>Go back</ButtonText>
        </ButtonWrapper>
        <Logo />
      </Header>
      <MainContentWrapper>
        <UserInfoWrapper>
          <UserIcon src={user} />
          <Email>{currentUser?.email}</Email>
        </UserInfoWrapper>
        <Heading>Your trips</Heading>
        <FavouritesList />
      </MainContentWrapper>
      <Footer />
    </Wrapper>
  );
};
