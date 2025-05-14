"use server";

import { UNAUTHORIZED_STATUS } from "@/shared/constants/auth";
import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import { getServerAccessToken } from "@/shared/models/auth/token";

import { _get, _mutate } from "../_server";
import { ErrorDTO } from "../common.interface";

import type { GetOptions, MutateOptions } from "../api.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const _mutateAuth = async (url: string, method: string, options: MutateOptions) => {
  const accessToken = await getServerAccessToken();

  try {
    return await _mutate(BASE_URL, method, url, {
      ...options,
      headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    if (isFetchHTTPError(error) && error.status === UNAUTHORIZED_STATUS) {
      const errorBody: ErrorDTO = { message: error.message, status: error.status, timestamp: error.timestamp };
      return new Response(JSON.stringify(errorBody), { status: UNAUTHORIZED_STATUS });
    }

    throw error;
  }
};

export const getAuthServer = async (url: string, options: GetOptions): Promise<Response> => {
  const accessToken = await getServerAccessToken();

  try {
    return await _get(BASE_URL, url, {
      ...options,
      headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    if (isFetchHTTPError(error) && error.status === UNAUTHORIZED_STATUS) {
      const errorBody: ErrorDTO = { message: error.message, status: error.status, timestamp: error.timestamp };
      return new Response(JSON.stringify(errorBody), { status: UNAUTHORIZED_STATUS });
    }
    throw error;
  }
};

export const postAuthServer = async (url: string, options: MutateOptions) => await _mutateAuth(url, "POST", options);
export const patchAuthServer = async (url: string, options: MutateOptions) => await _mutateAuth(url, "PATCH", options);
export const putAuthServer = async (url: string, options: MutateOptions) => await _mutateAuth(url, "PUT", options);
export const deleteAuthServer = async (url: string, options: MutateOptions) =>
  await _mutateAuth(url, "DELETE", options);
