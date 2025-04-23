"use server";

import { getServerAccessToken } from "@/shared/models/auth/token";

import { _get, _mutate } from "../_server";

import type { GetOptions, MutateOptions } from "../api.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getAuthServer = async (url: string, options: GetOptions) => {
  const accessToken = await getServerAccessToken();

  return await _get(BASE_URL, url, {
    ...options,
    headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
  });
};

export const postAuthServer = async (url: string, options: MutateOptions) => {
  const accessToken = await getServerAccessToken();

  return await _mutate(BASE_URL, "POST", url, {
    ...options,
    headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
  });
};

export const patchAuthServer = async (url: string, options: MutateOptions) => {
  const accessToken = await getServerAccessToken();

  return await _mutate(BASE_URL, "PATCH", url, {
    ...options,
    headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
  });
};

export const putAuthServer = async (url: string, options: MutateOptions) => {
  const accessToken = await getServerAccessToken();

  return await _mutate(BASE_URL, "PUT", url, {
    ...options,
    headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
  });
};

export const deleteAuthServer = async (url: string, options: MutateOptions) => {
  const accessToken = await getServerAccessToken();

  return await _mutate(BASE_URL, "DELETE", url, {
    ...options,
    headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
  });
};
