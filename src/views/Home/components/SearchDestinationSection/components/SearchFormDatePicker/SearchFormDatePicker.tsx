import React, { useState } from 'react';

import { useField, useFormikContext } from 'formik';
import moment, { Moment } from 'moment';
import { DateRangePicker } from 'react-dates';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { SearchFormTypes } from 'src/shared/types';

import { Breakpoint } from '../../../../../../enums/breakpoint.enum';
import { Button } from '../../../../../../styles/Button.styled';

import {
  CompactDatePicker,
  FullScreenDatePicker,
  InfoText,
  InfoWrapper,
  StyledLabel,
  StyledLabelsWrapper,
  Wrapper,
} from './SearchFormDatePicker.styled';
import { SearchFormDatePickerProps } from './SearchFormDatePicker.types';

export const SearchFormDatePicker: React.FC<SearchFormDatePickerProps> = ({ ...props }) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  const [field, , helpers] = useField(props);
  const { setValue } = helpers;

  const {
    values: { flightType },
  } = useFormikContext<SearchFormTypes>();

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });
  const isDesktop = useMediaQuery({
    query: `${Breakpoint.Desktop}`,
  });

  const handleDateChange = (selectedStartDate: Moment | null, selectedEndDate: Moment | null) => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
    setValue({
      inbound: selectedStartDate?.format('DD/MM/YYYY') as string,
      outbound: selectedEndDate?.format('DD/MM/YYYY') as string,
    });
  };

  const { t } = useTranslation();

  useLockBodyScroll(isTabletS ? false : !!focusedInput);

  const renderCalendarInfo = () => (
    <InfoWrapper>
      <InfoText>Pick a date</InfoText>
      <Button onClick={() => setFocusedInput(null)} variant="tertiary">
        Cancel
      </Button>
    </InfoWrapper>
  );

  return (
    <Wrapper>
      <StyledLabelsWrapper>
        <StyledLabel htmlFor="depart-date">{t('views.home.labels.depart')}</StyledLabel>
        <StyledLabel htmlFor="return-date">{t('views.home.labels.return')}</StyledLabel>
      </StyledLabelsWrapper>

      {isTabletS ? (
        <CompactDatePicker>
          <DateRangePicker
            startDate={startDate}
            startDateId="depart-date"
            endDate={flightType === 'oneway' ? null : endDate}
            endDateId="return-date"
            startDatePlaceholderText={t('views.home.placeholders.depart')}
            endDatePlaceholderText={t('views.home.placeholders.return')}
            onDatesChange={({ startDate, endDate }) => {
              handleDateChange(startDate, endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            orientation="horizontal"
            numberOfMonths={isDesktop ? 2 : 1}
            hideKeyboardShortcutsPanel
            firstDayOfWeek={1}
            readOnly
            disabled={flightType === 'oneway' && 'endDate'}
          />
        </CompactDatePicker>
      ) : (
        <FullScreenDatePicker isOpen={!!focusedInput}>
          <DateRangePicker
            {...field}
            startDate={startDate}
            startDateId="depart-date"
            endDate={flightType === 'oneway' ? null : endDate}
            endDateId="return-date"
            startDatePlaceholderText={t('views.home.placeholders.depart')}
            endDatePlaceholderText={t('views.home.placeholders.return')}
            onDatesChange={({ startDate, endDate }) => {
              handleDateChange(startDate, endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            orientation="vertical"
            numberOfMonths={13}
            hideKeyboardShortcutsPanel
            calendarInfoPosition="top"
            renderCalendarInfo={renderCalendarInfo}
            firstDayOfWeek={1}
            initialVisibleMonth={() => moment()}
            readOnly
            disabled={flightType === 'oneway' && 'endDate'}
          />
        </FullScreenDatePicker>
      )}
    </Wrapper>
  );
};
