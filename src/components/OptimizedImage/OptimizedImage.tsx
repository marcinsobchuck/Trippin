import React, { useEffect, useState } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ImageWrapper, StyledBlurhash } from './OptimizedImage.styled';

interface OptimizedImageProps {
  image: {
    src: string;
    blurHash: string;
  };
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ image }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    setLoadStarted(true);
  };

  useEffect(() => {
    setLoaded(false);
    setLoadStarted(false);
  }, [image]);

  return (
    <ImageWrapper>
      <LazyLoadImage
        key={image.src}
        src={image.src}
        height="100%"
        width="100%"
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
      />
      {!isLoaded && isLoadStarted && (
        <StyledBlurhash
          hash={image.blurHash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </ImageWrapper>
  );
};
