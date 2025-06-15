import { createContext, PropsWithChildren, use } from "react";

import { DatePickerContextProps, DatePickerContextType } from "./datepicker.interface";
import useDatePicker from "./useDatePicker";

const DatePickerContext = createContext<DatePickerContextType | undefined>(undefined);

const DatePickerContextProvider: React.FC<PropsWithChildren<DatePickerContextProps>> = ({ children, ...props }) => {
  const value = useDatePicker(props);
  if (!value) throw new Error("DatePickerContextProvider must be used within DatePickerContext");

  return <DatePickerContext value={value}>{children}</DatePickerContext>;
};

export const useDatePickerContext = () => {
  const value = use(DatePickerContext);

  if (!value) {
    throw new Error("useDatePickerContext must be used within DatePickerContextProvider");
  }

  return value;
};

export default DatePickerContextProvider;
