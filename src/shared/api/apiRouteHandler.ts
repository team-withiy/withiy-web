import ky from "ky";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api` as string;

export const apiRouteHandler = ky.create({
  prefixUrl: BASE_URL,
  retry: 0,
});

export { getKyHTTPError, isKyHTTPError } from "./apiClient";
