"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { DEFAULT_REVALIDATE } from "../constants/api";
import { getSearchParamsString } from "../lib/searchParams";
import { FetchHTTPException, getFetchHTTPError } from "../models/auth/fetchHTTPException";

import type { GetOptions, MutateOptions } from "./api.interface";

const getNextRevalidate = (options: GetOptions) => {
  if (options?.cache === "no-store" || options?.cache === "default") return undefined;
  return typeof options?.revalidate === "number" || options?.revalidate === false
    ? options.revalidate
    : DEFAULT_REVALIDATE;
};

export const _get = async (baseUrl: string, url: string, options: GetOptions) => {
  const params = getSearchParamsString(options?.params);

  const response = await fetch(`${baseUrl}${url}${params}`, {
    method: "GET",
    next: {
      revalidate: getNextRevalidate(options),
      tags: options.tags,
    },
    cache: options.cache,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new FetchHTTPException(await getFetchHTTPError(response));
  }

  return response;
};

export const _mutate = async (baseUrl: string, method: string, url: string, options: MutateOptions) => {
  const params = getSearchParamsString(options.params);
  const isFormData = options.isFormData;

  const response = await fetch(`${baseUrl}${url}${params}`, {
    method,
    body: isFormData ? (options.body as FormData) : JSON.stringify(options.body),
    headers: isFormData
      ? {
          ...options.headers,
        }
      : {
          "Content-Type": "application/json",
          ...options.headers,
        },
  });

  if (!response.ok) {
    throw new FetchHTTPException(await getFetchHTTPError(response));
  }

  options.revalidateTags?.forEach((tag) => revalidateTag(tag));
  options.revalidatePath?.forEach((path) => revalidatePath(path.path, path.type));

  return response;
};
