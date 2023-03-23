import React, { useEffect, useState } from "react";
import { usePhotos } from "src/apiServices/hooks/usePhotos";
import {
  StyledImage,
  ImageWrapper,
  SkeletonImage,
  ItemName,
  TagsWrapper,
  StyledTag,
} from "./TopDestinationsSideBarItem.styled";
import { Rings } from "react-loader-spinner";
import { Colors } from "src/enums/colors.enum";
import { Tag } from "src/apiServices/types/kiwiApi.types";
import { useSearchContext } from "../../hooks/useSearchContext";

import {
  setIsParamsEqual,
  setRangeSliderValue,
  setSearchFormData,
} from "../../reducer/actions/search.actions";
interface TopDestinationsSideBarItemProps {
  destinationName: string;
  continent: string;
  tags: Tag[];
  id: string;
}

export const TopDestinationsSideBarItem: React.FC<
  TopDestinationsSideBarItemProps
> = ({ destinationName, continent, tags, id }) => {
  const [queryTerm, setQueryTerm] = useState(destinationName);

  const { data, refetch, isFetching } = usePhotos({
    orientation: "landscape",
    per_page: 1,
    query: queryTerm,
  });

  const noResults = data?.data.results.length === 0;

  const [state, dispatch] = useSearchContext();

  const handleItemClick = () => {
    setIsParamsEqual(dispatch, false);
    setRangeSliderValue(dispatch, [0, 0]);
    setSearchFormData(dispatch, {
      ...state.searchFormData,
      destination: {
        id: id,
        text: destinationName,
      },
    });
  };

  useEffect(() => {
    if (noResults) {
      setQueryTerm(continent);
      refetch();
    }
  }, [continent, noResults, refetch]);

  if (isFetching)
    return (
      <ImageWrapper to='#'>
        <SkeletonImage>
          <Rings color={Colors.LightGrayOpacity} height={130} width={130} />
        </SkeletonImage>
      </ImageWrapper>
    );

  if (data?.data.results.length !== 0) {
    return (
      <ImageWrapper to='search-results' smooth onClick={handleItemClick}>
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
