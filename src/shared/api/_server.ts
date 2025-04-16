"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { DEFAULT_REVALIDATE } from "../constants/api";
import { getSearchParams } from "../lib/searchParams";

import type { GetOptions, MutateOptions } from "./api.interface";

const getNextRevalidate = (options?: GetOptions) => {
  if (options?.cache === "no-store" || options?.cache === "default") return undefined;
  return typeof options?.revalidate === "number" || options?.revalidate === false
    ? options.revalidate
    : DEFAULT_REVALIDATE;
};

export const _get = async <T>(baseUrl: string, url: string, options?: GetOptions) => {
  const params = getSearchParams(options?.params, true);

  const response = await fetch(`${baseUrl}${url}${params}`, {
    method: "GET",
    next: {
      revalidate: getNextRevalidate(options),
      tags: options?.tags,
    },
    cache: options?.cache,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  return (await response.json()) as T;
};

export const _mutate = async <T>(baseUrl: string, method: string, url: string, options?: MutateOptions): Promise<T> => {
  const params = getSearchParams(options?.params, true);
  const response = await fetch(`${baseUrl}${url}${params}`, {
    method,
    body: JSON.stringify(options?.body),
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  options?.revalidateTags?.forEach((tag) => revalidateTag(tag));
  options?.revalidatePath?.forEach((path) => revalidatePath(path.path, path.type));

  return (await response.json()) as T;
};
