export type SearchParamsValue = string | string[] | number | number[] | boolean | null | undefined;

const preprocessValue = (params?: Record<string, SearchParamsValue>) => {
  if (!params) return params;

  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.map((v) => v.toString());
      } else if (value !== null && value !== undefined) {
        acc[key] = [value.toString()];
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );
};

export const getSearchParams = (params?: Record<string, SearchParamsValue>, withQuestion?: boolean) => {
  const preprocessedParams = preprocessValue(params);
  if (!preprocessedParams) return "";
  const searchParams = new URLSearchParams();

  Object.entries(preprocessedParams).forEach(([key, values]) => {
    values.forEach((value) => {
      searchParams.append(key, value);
    });
  });

  const queryString = searchParams.toString();
  return withQuestion ? `?${queryString}` : queryString;
};
