import styled from "styled-components";
import { Breakpoint } from "../../../../enums/breakpoint.enum";
import { Colors } from "../../../../enums/colors.enum";
import { FontSize } from "../../../../enums/fontSize.enum";
import { FontWeight } from "../../../../enums/fontWeight.enum";

export const Wrapper = styled.div``;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
  padding: 0 12px;
`;

export const InfoText = styled.p`
  color: ${Colors.DarkerBlue};
  font-size: ${FontSize.Medium};
  font-weight: ${FontWeight.SemiBold};
`;

export const StyledLabelsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledLabel = styled.label`
  font-size: ${FontSize.Small};
  color: ${Colors.White};
  flex-basis: 55%;
  :nth-of-type(2) {
    flex-basis: 45%;
  }
`;

export const FullScreenDatePicker = styled.div`
  width: 100%;

  .DateRangePicker {
    position: static;
    width: 100%;
  }

  .DateRangePickerInput {
    display: flex;
    width: 100%;
    border-radius: 3px;
  }

  .DateRangePickerInput__withBorder {
    border: none;
    @media ${Breakpoint.DesktopXL} {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .DateInput {
    color: ${Colors.Black};
    flex-grow: 1;
    padding: 8px 16px;
    border-radius: 3px;
    ::placeholder {
      color: ${Colors.Silver};
    }
    @media ${Breakpoint.TabletS} {
      padding: 11px 16px;
    }
  }
  .DateInput_input {
    padding: 0px;
    color: ${Colors.Black};
    font-size: ${FontSize.Regular};
    font-weight: ${FontWeight.Regular};
    cursor: pointer;
    ::placeholder {
      color: ${Colors.Silver};
    }
  }

  .DateRangePickerInput_arrow {
    display: flex;
    align-items: center;
  }
  .DayPicker {
    box-shadow: none;
  }

  .DateRangePicker_picker {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    height: 100vh;
    width: 100%;
    z-index: 3;
  }
  .DayPickerNavigation {
    display: none;
  }

  .DayPicker_transitionContainer {
    height: 87vh !important;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 16px;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-track {
      background-color: ${Colors.Silver};
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 25px;
      background-color: ${Colors.DarkerBlue};
      transition: 2000;
      :hover {
        background-color: ${Colors.DarkBlue};
      }
    }
  }

  .DayPicker_weekHeaders {
    height: 6vh;
    border-bottom: 1px solid ${Colors.Silver};
    border-top: 1px solid ${Colors.Silver};
  }

  .DayPicker_weekHeader {
    display: flex;
    align-items: center;
    position: static;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
  }

  .DayPicker_weekHeader_ul {
    display: flex;
    margin: 0;
    width: 100%;
  }

  .DayPicker_weekHeader_li {
    flex-grow: 1;
  }

  .CalendarMonthGrid {
    width: auto !important;
  }

  .CalendarMonthGrid_month__hidden {
    visibility: visible;
  }

  .CalendarMonth_caption {
    color: ${Colors.DarkerBlue};
    padding-top: 36px;
    padding-bottom: 20px;
  }

  .CalendarMonth {
    padding: 0px !important;
  }

  .CalendarMonth_table {
    width: 100%;
    border-collapse: initial;
    border-spacing: 0px 2px;
  }

  .CalendarDay {
    border: none;
    width: 40px !important;
    height: 40px !important;
    border-radius: 12px;
    transition: 0.2s;
    :nth-last-of-type(1),
    :nth-last-of-type(2) {
      font-weight: ${FontWeight.SemiBold};
    }
  }

  .CalendarDay__default:hover {
    background-color: ${Colors.LightBlue};
    color: ${Colors.White};
  }
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:hover {
    border: none;
    background-color: transparent;
    color: ${Colors.Silver};
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${Colors.DarkerBlue};
    border: 1px solid ${Colors.DarkerBlue};
    color: ${Colors.White};
  }

  .CalendarDay__selected_start {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .CalendarDay__selected_end {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .CalendarDay__selected_span,
  .CalendarDay__selected_span:active {
    border-radius: 0;
    background: ${Colors.LightGray};
    color: ${Colors.Black};
  }
  .CalendarDay__selected_span:hover {
    border: none;
    background-color: ${Colors.LightBlue};
    color: ${Colors.White};
  }

  .CalendarDay__hovered_span {
    border-radius: 0;
    color: ${Colors.Black};
    background-color: ${Colors.LightGray};
    transition: 0.2s;
  }
  .CalendarDay__hovered_span:hover {
    border-radius: 12px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: ${Colors.DarkerBlue};
  }
`;

export const CompactDatePicker = styled.div`
  .DateRangePicker {
    position: relative;
    width: 100%;
  }

  .DateRangePicker_picker {
    @media ${Breakpoint.DesktopXL} {
      left: -311px !important;
    }
  }

  .DateRangePickerInput {
    display: flex;
    width: 100%;
    border-radius: 3px;
  }

  .DateRangePickerInput__withBorder {
    border: none;
    @media ${Breakpoint.DesktopXL} {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .DateInput {
    color: ${Colors.Black};
    flex-grow: 1;
    padding: 8px 16px;
    border-radius: 3px;
    cursor: pointer;

    ::placeholder {
      color: ${Colors.Silver};
    }
    @media ${Breakpoint.TabletS} {
      padding: 11px 16px;
    }
  }

  .DateInput__disabled,
  .DateRangePickerInput__disabled,
  .DateInput_input__disabled {
    background-color: ${Colors.DeepDarkBlue};
  }

  .DateInput_fang {
    top: 56px !important;
  }

  .DateInput_input {
    padding: 0px;
    color: ${Colors.Black};
    font-size: ${FontSize.Regular};
    font-weight: ${FontWeight.Regular};

    ::placeholder {
      color: ${Colors.Silver};
    }
  }

  .DateInput_input__focused {
    border-bottom: 2px solid ${Colors.LightBlue};
  }

  .DateRangePickerInput_arrow {
    display: flex;
    align-items: center;
  }

  .CalendarMonth_caption {
    color: ${Colors.DarkerBlue};
  }

  .DayPickerNavigation_button__default {
    transition: 0.2s;
  }

  .DayPickerNavigation_button__default:hover {
    border: 1px solid ${Colors.DarkerBlue};
  }
  .DayPickerNavigation_svg__horizontal {
    fill: ${Colors.DarkerBlue};
  }

  .CalendarMonth_table {
    width: 100%;
    border-collapse: initial;
    border-spacing: 0px 2px;
  }

  .CalendarDay {
    border: none;
    border-radius: 12px;
    :nth-last-of-type(1),
    :nth-last-of-type(2) {
      font-weight: ${FontWeight.SemiBold};
    }
    transition: 0.2s;
  }

  .CalendarDay__default:hover {
    background-color: ${Colors.LightBlue};
    color: ${Colors.White};
  }
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:hover {
    border: none;
    background-color: transparent;
    color: ${Colors.Silver};
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${Colors.DarkerBlue};
    border: 1px solid ${Colors.DarkerBlue};
    color: ${Colors.White};
  }

  .CalendarDay__selected_start {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .CalendarDay__selected_end {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .CalendarDay__selected_span,
  .CalendarDay__selected_span:active {
    border-radius: 0;
    background: ${Colors.LightGray};
    color: ${Colors.Black};
  }
  .CalendarDay__selected_span:hover {
    border: none;
    background-color: ${Colors.LightBlue};

    color: ${Colors.White};
  }

  .CalendarDay__hovered_span {
    border-radius: 0;
    transition: 0.2s;
    color: ${Colors.Black};
    background-color: ${Colors.LightGray};
  }
  .CalendarDay__hovered_span:hover {
    border-radius: 12px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: ${Colors.DarkerBlue};
  }
`;
