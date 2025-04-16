"use server";

import { _get, _mutate } from "./_server";

import type { GetOptions, MutateOptions } from "./api.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getServer = async <T>(url: string, options?: GetOptions) => await _get<T>(BASE_URL, url, options);
export const postServer = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "POST", url, options);
export const patchServer = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "PATCH", url, options);
export const putServer = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "PUT", url, options);
export const deleteServer = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "DELETE", url, options);
