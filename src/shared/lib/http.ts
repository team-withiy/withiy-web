export const isStatusError = (status: number): boolean => {
  return status >= 400;
};

export const isStatusSuccess = (status: number): boolean => {
  return status >= 200 && status < 300;
};
