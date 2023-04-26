import React from 'react';

import { useSelect } from 'downshift';

import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';
import { setSort } from 'src/views/Home/reducer/actions/search.actions';

import { options } from '../FilterAndSort/config';

import { StyledButton, StyledItem, StyledLabel, StyledList, StyledText, Wrapper } from './SortSelect.styled';

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
      if (selectedItem) {
        setSort(dispatch, selectedItem.value);
      }
    },
    defaultSelectedItem: options[0],
  });

  return (
    <Wrapper>
      <StyledLabel {...getLabelProps()}>Sort by</StyledLabel>
      <StyledButton type="button" {...getToggleButtonProps()}>
        <StyledText>{selectedItem && selectedItem.text}</StyledText>
        <Icon name="arrowIcon" width={18} height={18} />
      </StyledButton>
      <StyledList
        {...getMenuProps({
          style: {
            border: isOpen ? `1px solid ${Colors.Silver}` : '',
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
                  backgroundColor: highlightedIndex === index ? '#bde4ff' : '',
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
