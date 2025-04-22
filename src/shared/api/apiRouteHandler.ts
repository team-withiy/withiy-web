"use server";

import { _get, _mutate } from "./_server";

import type { GetOptions, MutateOptions } from "./api.interface";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api` as string;

export const getRouteHandler = async (url: string, options?: GetOptions) => await _get(BASE_URL, url, options);
export const postRouteHandler = async (url: string, options?: MutateOptions) =>
  await _mutate(BASE_URL, "POST", url, options);
export const patchRouteHandler = async (url: string, options?: MutateOptions) =>
  await _mutate(BASE_URL, "PATCH", url, options);
export const putRouteHandler = async (url: string, options?: MutateOptions) =>
  await _mutate(BASE_URL, "PUT", url, options);
export const deleteRouteHandler = async (url: string, options?: MutateOptions) =>
  await _mutate(BASE_URL, "DELETE", url, options);
