import React from 'react';

import { useSelect } from 'downshift';
import { FieldHookConfig, useField } from 'formik';

import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';

import { languages } from './config';
import {
  SelectWrapper,
  StyledButton,
  StyledIcon,
  StyledLabel,
  StyledList,
  StyledListItem,
  StyledSelectedItem,
  StyledText,
} from './Select.styled';
import { Language } from './Select.types';

export const LanguageSelect: React.FC<FieldHookConfig<Language>> = ({ ...props }) => {
  const { regionalSettings } = useAuth();
  const [, , helpers] = useField(props);
  const { setValue } = helpers;
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: languages,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setValue({
          language: selectedItem.language,
          languageCode: selectedItem.languageCode,
          flag: selectedItem.flag,
        });
      }
    },
  });

  return (
    <SelectWrapper>
      <StyledLabel {...getLabelProps()}>Language choice</StyledLabel>
      <StyledButton
        type="button"
        {...getToggleButtonProps({
          style: {
            border: isOpen ? `1px solid ${Colors.LightBlue}` : '',
          },
        })}
      >
        <StyledSelectedItem>
          <StyledIcon src={selectedItem ? selectedItem.flag : regionalSettings.language.flag} alt="flag" />
          <StyledText>{selectedItem ? selectedItem.language : regionalSettings.language.language}</StyledText>
        </StyledSelectedItem>
        <Icon name="arrowIcon" width={32} height={32} />
      </StyledButton>
      <StyledList
        {...getMenuProps({
          style: {
            border: isOpen ? `1px solid ${Colors.Silver}` : '',
          },
        })}
      >
        {isOpen &&
          languages.map((item, index) => (
            <StyledListItem
              key={item.flag}
              {...getItemProps({
                item,
                index,
                style: {
                  backgroundColor: highlightedIndex === index ? '#bde4ff' : '',
                },
              })}
            >
              {item.language}
              <StyledIcon src={item.flag} alt="flag" />
            </StyledListItem>
          ))}
      </StyledList>
    </SelectWrapper>
  );
};
