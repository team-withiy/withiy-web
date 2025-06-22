import { useCallback, useState } from "react";

import { dayjs, type Dayjs } from "@/shared/lib/date";

import type {
  DatePickerContextProps,
  DatePickerContextType,
  DatePickerViewMode,
  SelectedDate,
} from "./datepicker.interface";

const useDatePicker = ({
  onDateChange,
  selectedDate,
  onClose,
  filterEnableDates,
}: DatePickerContextProps): DatePickerContextType => {
  const [localSelectedDate, setLocalSelectedDate] = useState<SelectedDate>(() =>
    selectedDate ? dayjs(selectedDate) : undefined,
  );
  const [focusedMonth, setFocusedMonth] = useState<Dayjs>(() => dayjs(selectedDate || undefined));
  const [viewMode, setViewMode] = useState<DatePickerViewMode>("month");

  const onSelectDate: DatePickerContextType["onSelectDate"] = useCallback((date) => {
    setLocalSelectedDate(date);
  }, []);

  const onClickArrowInMonthViewMode: DatePickerContextType["onClickArrowInMonthViewMode"] = useCallback(() => {
    setViewMode("year");
  }, []);

  const onClickArrowInYearViewMode: DatePickerContextType["onClickArrowInYearViewMode"] = useCallback((direction) => {
    if (direction === "left") {
      setFocusedMonth((prev) => prev.subtract(1, "year"));
    } else {
      setFocusedMonth((prev) => prev.add(1, "year"));
    }
  }, []);

  const checkMonthAvailableInYearViewMode: DatePickerContextType["checkMonthAvailableInYearViewMode"] = useCallback(
    (month) => {
      if (!filterEnableDates) return true;

      const monthFirstDay = month.startOf("month");
      const monthLastDay = month.endOf("month");
      const daysInMonth = monthLastDay.date();

      return Array.from({ length: daysInMonth }, (_, index) => monthFirstDay.add(index, "day")).reduce((acc, cur) => {
        if (acc) return true;
        return filterEnableDates(cur);
      }, false);
    },
    [filterEnableDates],
  );

  const checkDateAvailableInMonthViewMode: DatePickerContextType["checkDateAvailableInMonthViewMode"] = useCallback(
    (date) => {
      if (!filterEnableDates) return true;
      return filterEnableDates(date);
    },
    [filterEnableDates],
  );

  const onClickMonthInYearViewMode: DatePickerContextType["onClickMonthInYearViewMode"] = useCallback((month) => {
    setFocusedMonth(month);
    setViewMode("month");
  }, []);

  const onConfirm: DatePickerContextType["onConfirm"] = useCallback(() => {
    if (!localSelectedDate) return;
    onDateChange(localSelectedDate);
    onClose();
  }, [localSelectedDate, onClose, onDateChange]);

  const onCancel: DatePickerContextType["onCancel"] = useCallback(() => {
    onClose();
  }, [onClose]);

  return {
    focusedMonth,
    localSelectedDate,
    viewMode,
    onSelectDate,
    onClickArrowInMonthViewMode,
    onClickArrowInYearViewMode,
    checkMonthAvailableInYearViewMode,
    checkDateAvailableInMonthViewMode,
    onClickMonthInYearViewMode,
    onCancel,
    onConfirm,
  };
};

export default useDatePicker;
