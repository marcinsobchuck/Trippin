import React from "react";
import { useSelect } from "downshift";
import arrowIcon from "src/assets/images/arrow.svg";
import { useField, FieldHookConfig } from "formik";
import {
  Arrow,
  SelectWrapper,
  StyledButton,
  StyledIcon,
  StyledLabel,
  StyledList,
  StyledListItem,
  StyledSelectedItem,
  StyledText,
} from "./Select.styled";
import { Colors } from "src/enums/colors.enum";
import { useAuth } from "src/hooks/useAuth";
import { currencies } from "./config";
import { Currency } from "./Select.types";

export const CurrencySelect: React.FC<FieldHookConfig<Currency>> = ({
  ...props
}) => {
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
      selectedItem &&
        setValue({
          currency: selectedItem.currency,
          currencyCode: selectedItem.currencyCode,
          currencyIcon: selectedItem.currencyIcon,
        });
    },
  });

  return (
    <SelectWrapper>
      <StyledLabel {...getLabelProps()}>Currency choice</StyledLabel>
      <StyledButton
        type="button"
        {...getToggleButtonProps({
          style: {
            border: isOpen ? `1px solid ${Colors.LightBlue}` : "",
          },
        })}
      >
        <StyledSelectedItem>
          <StyledIcon
            src={
              selectedItem
                ? selectedItem.currencyIcon
                : regionalSettings.currency.currencyIcon
            }
            alt="currency symbol"
          />
          <StyledText>
            {selectedItem
              ? selectedItem.currency
              : regionalSettings.currency.currency}
          </StyledText>
        </StyledSelectedItem>
        <Arrow src={arrowIcon} />
      </StyledButton>
      <StyledList
        {...getMenuProps({
          style: {
            border: isOpen ? `1px solid ${Colors.Silver}` : "",
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
                  backgroundColor: highlightedIndex === index ? "#bde4ff" : "",
                },
              })}
            >
              {item.currency} - {item.currencyCode}
              <StyledIcon src={item.currencyIcon} alt="icon" />
            </StyledListItem>
          ))}
      </StyledList>
    </SelectWrapper>
  );
};
