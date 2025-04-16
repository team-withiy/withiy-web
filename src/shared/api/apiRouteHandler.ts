"use server";

import { _get, _mutate } from "./_server";

import type { GetOptions, MutateOptions } from "./api.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const getRouteHandler = async <T>(url: string, options?: GetOptions) => await _get<T>(BASE_URL, url, options);
export const postRouteHandler = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "POST", url, options);
export const patchRouteHandler = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "PATCH", url, options);
export const putRouteHandler = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "PUT", url, options);
export const deleteRouteHandler = async <T>(url: string, options?: MutateOptions) =>
  await _mutate<T>(BASE_URL, "DELETE", url, options);
