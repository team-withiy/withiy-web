let idCounter = 0;

export const generateID = (prefix = "react-id"): string => {
  return `${prefix}${(idCounter += 1)}`;
};
