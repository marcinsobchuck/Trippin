import React, { useEffect, useState } from 'react';

import { useField, useFormikContext } from 'formik';
import moment, { Moment } from 'moment';
import { DateRangePicker } from 'react-dates';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import i18n from 'src/i18n';
import { Button } from 'src/styles/Button.styled';
import { SearchFormTypes } from 'src/views/Home/types/types';

import {
  CompactDatePicker,
  ErrorSpace,
  ErrorStyled,
  FullScreenDatePicker,
  InfoText,
  InfoWrapper,
  StyledLabel,
  StyledLabelsWrapper,
  Wrapper,
} from './SearchFormDatePicker.styled';
import { SearchFormDatePickerProps } from './SearchFormDatePicker.types';

import 'moment/locale/pl';

export const SearchFormDatePicker: React.FC<SearchFormDatePickerProps> = ({ error, ...props }) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  const [, meta, helpers] = useField(props);
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
  const { language } = i18n;

  useEffect(() => {
    moment.locale(language);
  }, [language]);

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
        <StyledLabel htmlFor="depart-date">
          {t('views.home.labels.depart')}
          {meta.error && meta.touched && error?.inbound ? (
            <ErrorStyled>{t(error.inbound)}</ErrorStyled>
          ) : (
            <ErrorSpace>error</ErrorSpace>
          )}
        </StyledLabel>

        <StyledLabel htmlFor="return-date">
          {t('views.home.labels.return')}
          {meta.error && meta.touched && error?.outbound ? (
            <ErrorStyled>{t(error.outbound)}</ErrorStyled>
          ) : (
            <ErrorSpace>Error</ErrorSpace>
          )}
        </StyledLabel>
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
            disabled={flightType === 'oneway' && 'endDate'}
            displayFormat="DD/MM/YYYY"
          />
        </CompactDatePicker>
      ) : (
        <FullScreenDatePicker isOpen={!!focusedInput}>
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
            orientation="vertical"
            numberOfMonths={13}
            hideKeyboardShortcutsPanel
            calendarInfoPosition="top"
            renderCalendarInfo={renderCalendarInfo}
            firstDayOfWeek={1}
            initialVisibleMonth={() => moment()}
            disabled={flightType === 'oneway' && 'endDate'}
            displayFormat="DD/MM/YYYY"
          />
        </FullScreenDatePicker>
      )}
    </Wrapper>
  );
};
