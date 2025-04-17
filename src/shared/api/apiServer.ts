"use server";

import { _get, _mutate } from "./_server";

import type { GetOptions, MutateOptions } from "./api.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getServer = async (url: string, options?: GetOptions) => await _get(BASE_URL, url, options);
export const postServer = async (url: string, options?: MutateOptions) => await _mutate(BASE_URL, "POST", url, options);
export const patchServer = async (url: string, options?: MutateOptions) =>
  await _mutate(BASE_URL, "PATCH", url, options);
export const putServer = async (url: string, options?: MutateOptions) => await _mutate(BASE_URL, "PUT", url, options);
export const deleteServer = async (url: string, options?: MutateOptions) =>
  await _mutate(BASE_URL, "DELETE", url, options);
