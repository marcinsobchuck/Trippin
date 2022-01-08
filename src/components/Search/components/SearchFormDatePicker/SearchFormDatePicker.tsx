import moment, { Moment } from "moment";
import React, { useState } from "react";

import { DateRangePicker } from "react-dates";
import { Button } from "../../../../styles/Button.styled";
import {
  CompactDatePicker,
  InfoWrapper,
  StyledLabel,
  StyledLabelsWrapper,
  Wrapper,
  FullScreenDatePicker,
  InfoText,
} from "./SearchFormDatePicker.styled";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "../../../../enums/breakpoint.enum";
import { useField } from "formik";
import { SearchFormDatePickerProps } from "./SearchFormDatePicker.types";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../../hooks/useSearchContext";

export const SearchFormDatePicker: React.FC<SearchFormDatePickerProps> = ({
  ...props
}) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);

  const [, , helpers] = useField(props);

  const { setValue } = helpers;

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });
  const isDesktop = useMediaQuery({
    query: `${Breakpoint.Desktop}`,
  });

  const handleDateChange = (
    selectedStartDate: Moment | null,
    selectedEndDate: Moment | null
  ) => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
    setValue({
      depart: selectedStartDate?.format("YYYY-MM-DD"),
      return: selectedEndDate?.format("YYYY-MM-DD"),
    });
  };

  const { t } = useTranslation();

  const [state] = useSearchContext();

  const renderCalendarInfo = () => {
    return (
      <InfoWrapper>
        <InfoText>Pick a date</InfoText>
        <Button onClick={() => setFocusedInput(null)} variant="tertiary">
          Cancel
        </Button>
      </InfoWrapper>
    );
  };

  return (
    <Wrapper>
      <StyledLabelsWrapper>
        <StyledLabel htmlFor="depart-date">
          {t("views.home.labels.depart")}
        </StyledLabel>
        <StyledLabel htmlFor="return-date">
          {t("views.home.labels.return")}
        </StyledLabel>
      </StyledLabelsWrapper>

      {isTabletS ? (
        <CompactDatePicker>
          <DateRangePicker
            startDate={startDate}
            startDateId="depart-date"
            endDate={state.flightType === "oneway" ? null : endDate}
            endDateId="return-date"
            startDatePlaceholderText={t("views.home.placeholders.depart")}
            endDatePlaceholderText={t("views.home.placeholders.return")}
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
            disabled={state.flightType === "oneway" && "endDate"}
          />
        </CompactDatePicker>
      ) : (
        <FullScreenDatePicker>
          <DateRangePicker
            startDate={startDate}
            startDateId="depart-date"
            endDate={state.flightType === "oneway" ? null : endDate}
            endDateId="return-date"
            startDatePlaceholderText={t("views.home.placeholders.depart")}
            endDatePlaceholderText={t("views.home.placeholders.return")}
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
            disabled={state.flightType === "oneway" && "endDate"}
          />
        </FullScreenDatePicker>
      )}
    </Wrapper>
  );
};
