import React from 'react';

import { useSelect } from 'downshift';
import { FieldHookConfig, useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { Icon } from 'src/components/Icon/Icon';
import { Currency } from 'src/context/AuthContext.types';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';

import { currencies } from './config';
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

export const CurrencySelect: React.FC<FieldHookConfig<Currency>> = ({ ...props }) => {
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
    items: currencies,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        const { currency_key, currencyCode, currencyIcon } = selectedItem;
        setValue({
          currency_key,
          currencyCode,
          currencyIcon,
        });
      }
    },
  });

  const { t } = useTranslation();

  return (
    <SelectWrapper>
      <StyledLabel {...getLabelProps()}>{t('views.home.labels.currencyChoice')}</StyledLabel>
      <StyledButton
        type="button"
        {...getToggleButtonProps({
          style: {
            border: isOpen ? `1px solid ${Colors.LightBlue}` : '',
          },
        })}
      >
        <StyledSelectedItem>
          <StyledIcon
            src={selectedItem ? selectedItem.currencyIcon : regionalSettings.currency.currencyIcon}
            alt="currency symbol"
          />
          <StyledText>
            {selectedItem ? t(selectedItem.currency_key) : t(regionalSettings.currency.currency_key)}
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
          currencies.map((item, index) => (
            <StyledListItem
              key={item.currencyIcon}
              {...getItemProps({
                item,
                index,
                style: {
                  backgroundColor: highlightedIndex === index ? '#bde4ff' : '',
                },
              })}
            >
              {t(item.currency_key)} - {item.currencyCode}
              <StyledIcon src={item.currencyIcon} alt="icon" />
            </StyledListItem>
          ))}
      </StyledList>
    </SelectWrapper>
  );
};
