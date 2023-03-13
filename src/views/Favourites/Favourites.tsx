import React from "react";
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
} from "./Favourites.styled";
import rarrow from "src/assets/images/arrow.svg";
import { Logo } from "src/components/Logo/Logo";
import { useHistory } from "react-router-dom";
import { FavouritesList } from "src/components/FavouritesList/FavouritesList";

import user from "src/assets/images/user.svg";
import { useAuth } from "src/hooks/useAuth";

export const Favourites: React.FC = () => {
  const history = useHistory();

  const { currentUser } = useAuth();

  const handleButtonClick = () => history.goBack();
  return (
    <>
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
    </>
  );
};
