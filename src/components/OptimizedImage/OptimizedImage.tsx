import React, { useEffect } from "react";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Photo } from "src/apiServices/types/unsplashApi.types";
import { ImageWrapper, StyledBlurhash } from "./OptimizedImage.styled";

interface OptimizedImageProps {
  image?: Photo;
  isFetching: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  image,
  isFetching,
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    console.log("Started: ");
    setLoadStarted(true);
  };

  useEffect(() => {
    setLoaded(false);
    setLoadStarted(false);
  }, [image]);

  console.log(isFetching);
  return (
    <ImageWrapper>
      {!isFetching && (
        <LazyLoadImage
          key={image?.id}
          src={image?.urls.full}
          height='100%'
          width='100%'
          onLoad={handleLoad}
          beforeLoad={handleLoadStarted}
        />
      )}

      {!isLoaded && isLoadStarted && image?.blur_hash && (
        <StyledBlurhash
          hash={image.blur_hash}
          width='100%'
          height='100%'
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </ImageWrapper>
  );
};
