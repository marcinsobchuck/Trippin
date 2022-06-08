import React from "react";
import { useSelect } from "downshift";
import {
  Arrow,
  StyledButton,
  StyledItem,
  StyledLabel,
  StyledList,
  StyledText,
  Wrapper,
} from "./SortSelect.styled";
import { Colors } from "src/enums/colors.enum";
import arrow from "src/assets/images/arrow.svg";
import { useSearchContext } from "src/components/Search/hooks/useSearchContext";
import { SearchActions } from "src/components/Search/reducer/enums/searchActions.enum";
import {
  SortByType,
  SortTypeType,
} from "src/components/Search/reducer/types/searchReducer.types";

// 1 - ascending, 0 - descending

interface Option {
  value: {
    sortBy: SortByType;
    sortType: SortTypeType;
  };
  text: string;
}

const options: Option[] = [
  {
    value: {
      sortBy: "price",
      sortType: 1,
    },
    text: "Price: from lowest",
  },
  {
    value: {
      sortBy: "price",
      sortType: 0,
    },
    text: "Price: from highest",
  },
  {
    value: {
      sortBy: "duration",
      sortType: 1,
    },
    text: "Duration: from shortest",
  },
  {
    value: {
      sortBy: "duration",
      sortType: 0,
    },
    text: "Duration: from longest",
  },
  {
    value: {
      sortBy: "quality",
      sortType: 1,
    },
    text: "Quality: from highest",
  },
  {
    value: {
      sortBy: "quality",
      sortType: 0,
    },
    text: "Quality: from lowest",
  },
];

export const SortSelect: React.FC = () => {
  const [{ sort }, dispatch] = useSearchContext();
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    onSelectedItemChange: ({ selectedItem }) => {
      selectedItem &&
        dispatch({ type: SearchActions.SET_SORT, payload: selectedItem.value });
    },
    defaultSelectedItem: options[0],
  });

  return (
    <Wrapper>
      <StyledLabel {...getLabelProps()}>Sort by</StyledLabel>
      <StyledButton type='button' {...getToggleButtonProps()}>
        <StyledText>{selectedItem && selectedItem.text}</StyledText>
        <Arrow src={arrow} />
      </StyledButton>
      <StyledList
        {...getMenuProps({
          style: {
            border: isOpen ? `1px solid ${Colors.Silver}` : "",
          },
        })}
      >
        {isOpen &&
          options.map((item, index) => (
            <StyledItem
              key={item.text}
              {...getItemProps({
                item,
                index,
                style: {
                  backgroundColor: highlightedIndex === index ? "#bde4ff" : "",
                },
              })}
            >
              <StyledText>{item.text}</StyledText>
            </StyledItem>
          ))}
      </StyledList>
    </Wrapper>
  );
};
