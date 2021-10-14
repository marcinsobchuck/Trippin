import React, { useEffect, useState } from "react";
import {
  ListWrapper,
  Item,
  StyledLogo,
  SidebarWrapper,
  Wrapper,
} from "./SearchDestinationSection.styled";
import { useTransition, animated } from "react-spring";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "../../enums/breakpoint.enum";
import { RecommendedPlaces } from "../../enums/backgroundImages.enum";
import { RecommendedPlacesMap } from "../../enums/backgroundImages.enum";
import { recommendedPlacesArray } from "./config";
import { Colors } from "../../enums/colors.enum";
import landscapeBudapest from "../../assets/landscapeBudapest.jpg";
import { SearchForm } from "../SearchForm/SearchForm";

export const SearchDestinationSection: React.FC = () => {
  const [currentRecommendedPlace, setCurrentRecommendedPlace] =
    useState<string>(RecommendedPlaces.BUDAPEST);
  const [currentUrl, setCurrentUrl] = useState<any>(landscapeBudapest);
  const [initialised, setInitialised] = useState<boolean>(false);

  const isDesktop = useMediaQuery({
    query: `${Breakpoint.Tablet}`,
  });

  const transitions = useTransition(currentUrl, {
    key: currentUrl,
    from: { opacity: initialised ? 0 : 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 2000 },
  });

  const handleClickOnPlace = (event: React.MouseEvent<HTMLLIElement>) => {
    const text = event.currentTarget.innerHTML;
    setCurrentRecommendedPlace(text);
  };

  useEffect(() => {
    setInitialised(true);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setCurrentUrl(
        RecommendedPlacesMap.get(currentRecommendedPlace)?.landscape
      );
    } else {
      setCurrentUrl(
        RecommendedPlacesMap.get(currentRecommendedPlace)?.portrait
      );
    }
  }, [currentRecommendedPlace, isDesktop]);

  return (
    <Wrapper>
      {transitions((style, item) => (
        <animated.div
          style={{
            ...style,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: -10,
            backgroundImage: `url(${item})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "opacity",
          }}
        />
      ))}
      <SidebarWrapper>
        <StyledLogo color={Colors.White} />
        <ListWrapper>
          {recommendedPlacesArray.map((place) => (
            <Item
              isActive={currentRecommendedPlace === place.place}
              key={place.id}
              onClick={handleClickOnPlace}
            >
              {place.place}
            </Item>
          ))}
        </ListWrapper>
      </SidebarWrapper>
      <SearchForm />
    </Wrapper>
  );
};
