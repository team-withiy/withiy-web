import type { Dayjs } from "@/shared/lib/date";
import { MakeUnionRequired } from "@/shared/lib/utils.interface";

export type DatePickerViewMode = "month" | "year";
export type DatePickerYearViewModeArrowDirection = "left" | "right";

export type SelectedDate = Date | Dayjs | null | undefined;
export type RequiredSelectedDate = MakeUnionRequired<SelectedDate>;

export type OnDateChange = (date: RequiredSelectedDate) => void;

export type FilterEnableDates = (date: RequiredSelectedDate) => boolean;

export interface DatePickerContextProps {
  selectedDate: SelectedDate;
  filterEnableDates?: FilterEnableDates;
  onDateChange: OnDateChange;
  onClose: () => void;
}

export interface DatePickerContextType {
  focusedMonth: Dayjs;
  localSelectedDate: SelectedDate;
  viewMode: DatePickerViewMode;
  onSelectDate: (date: RequiredSelectedDate) => void;
  onClickArrowInMonthViewMode: () => void;
  onClickArrowInYearViewMode: (direction: DatePickerYearViewModeArrowDirection) => void;
  onClickMonthInYearViewMode: (month: Dayjs) => void;
  checkMonthAvailableInYearViewMode: (month: Dayjs) => boolean;
  checkDateAvailableInMonthViewMode: (date: Dayjs) => boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
