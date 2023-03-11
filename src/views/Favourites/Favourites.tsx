import React from "react";
import {
  Arrow,
  ButtonText,
  ButtonWrapper,
  Header,
  MainContentWrapper,
} from "./Favourites.styled";
import rarrow from "src/assets/images/arrow.svg";
import { Logo } from "src/components/Logo/Logo";
import { useHistory } from "react-router-dom";
import { FavouritesList } from "src/components/FavouritesList/FavouritesList";

export const Favourites: React.FC = () => {
  const history = useHistory();

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
        <FavouritesList />
      </MainContentWrapper>
    </>
  );
};
