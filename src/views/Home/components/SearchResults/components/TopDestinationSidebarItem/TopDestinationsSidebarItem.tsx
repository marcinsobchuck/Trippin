import React, { useEffect, useState } from 'react';

import { Rings } from 'react-loader-spinner';

import { usePhotos } from 'src/apiServices/hooks/usePhotos';
import { Colors } from 'src/enums/colors.enum';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';
import {
  setIsParamsEqual,
  setRangeSliderValue,
  setSearchFormData,
} from 'src/views/Home/reducer/actions/search.actions';

import {
  ImageWrapper,
  ItemName,
  SkeletonImage,
  StyledImage,
  StyledTag,
  TagsWrapper,
} from './TopDestinationsSidebarItem.styled';
import { TopDestinationsSideBarItemProps } from './TopDestinationsSidebarItem.types';

export const TopDestinationsSideBarItem: React.FC<TopDestinationsSideBarItemProps> = ({
  destinationName,
  continent,
  tags,
  id,
}) => {
  const [queryTerm, setQueryTerm] = useState(destinationName);

  const { data, refetch, isLoading } = usePhotos({
    orientation: 'landscape',
    per_page: 1,
    query: queryTerm,
  });

  const noResults = data?.data.results.length === 0; //

  const [state, dispatch] = useSearchContext();

  const handleItemClick = () => {
    setIsParamsEqual(dispatch, false);
    setRangeSliderValue(dispatch, [0, 0]);
    setSearchFormData(dispatch, {
      ...state.searchFormData,
      destination: { id, text: destinationName },
    });
  };

  useEffect(() => {
    if (noResults) {
      setQueryTerm(continent);
      refetch();
    }
  }, [continent, noResults, refetch]);

  if (isLoading) {
    return (
      <ImageWrapper to="#">
        <SkeletonImage>
          <Rings color={Colors.LightGrayOpacity} height={130} width={130} />
        </SkeletonImage>
      </ImageWrapper>
    );
  }

  if (data?.data.results.length !== 0) {
    return (
      <ImageWrapper to="search-results" smooth onClick={handleItemClick}>
        <ItemName>
          <p>{destinationName}</p>
        </ItemName>
        <TagsWrapper>
          {tags.map((tag) => (
            <StyledTag key={tag.tag}>{tag.tag}</StyledTag>
          ))}
        </TagsWrapper>

        <StyledImage src={data?.data.results[0].urls.regular} />
      </ImageWrapper>
    );
  }

  return null;
};
