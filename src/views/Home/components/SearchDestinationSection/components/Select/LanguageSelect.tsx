import React from 'react';

import { useSelect } from 'downshift';
import { FieldHookConfig, useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { Icon } from 'src/components/Icon/Icon';
import { Language } from 'src/context/AuthContext.types';
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
          language_key: selectedItem.language_key,
          languageCode: selectedItem.languageCode,
          flag: selectedItem.flag,
        });
      }
    },
  });

  const { t } = useTranslation();

  return (
    <SelectWrapper>
      <StyledLabel {...getLabelProps()}>{t('views.home.labels.languageChoice')}</StyledLabel>
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
          <StyledText>
            {selectedItem ? t(selectedItem.language_key) : t(regionalSettings.language.language_key)}
          </StyledText>
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
              {t(item.language_key)}
              <StyledIcon src={item.flag} alt="flag" />
            </StyledListItem>
          ))}
      </StyledList>
    </SelectWrapper>
  );
};
