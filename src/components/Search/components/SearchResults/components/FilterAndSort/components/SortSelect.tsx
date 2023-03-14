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
import { options } from "../config";
import { setSort } from "src/components/Search/reducer/actions/search.actions";

export const SortSelect: React.FC = () => {
  const [, dispatch] = useSearchContext();
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
      selectedItem && setSort(dispatch, selectedItem.value);
    },
    defaultSelectedItem: options[0],
  });

  console.log(selectedItem?.value);

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
