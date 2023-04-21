import React from 'react';

import notFound from 'src/assets/images/notfound.jpg';

import { ContentWrapper, MainText, NotFoundImage, Text, Wrapper } from './NotFound404.styled';

export const NotFound404: React.FC = () => (
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
