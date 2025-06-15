import type { Dayjs } from "@/shared/lib/date";
import { MakeUnionRequired } from "@/shared/lib/utils.interface";

export type DatePickerViewMode = "month" | "year";
export type DatePickerYearViewModeArrowDirection = "left" | "right";

export type SelectedDate = Date | Dayjs | null | undefined;
export type RequiredSelectedDate = MakeUnionRequired<SelectedDate>;

export type OnDateChange = (date: RequiredSelectedDate) => void;

export interface DatePickerContextProps {
  selectedDate: SelectedDate;
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
  onConfirm: () => void;
  onCancel: () => void;
}
