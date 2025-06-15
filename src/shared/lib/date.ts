import dayjs, { type Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | Date | string, format: string): string => {
  return dayjs(date).format(format);
};

export { dayjs, type Dayjs };
