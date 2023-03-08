import React from "react";
import {
  ContentWrapper,
  MainText,
  Text,
  Wrapper,
  NotFoundImage,
} from "./NotFound404.styled";
import notFound from "src/assets/images/notfound.jpg";

export const NotFound404: React.FC = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <NotFoundImage src={notFound} />
        <div>
          <MainText>Error 404</MainText>
          <Text>Page doesn't exist</Text>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};
