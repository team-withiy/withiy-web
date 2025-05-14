"use server";

import { vi } from "vitest";

const cookieStore = new Map<string, string>();

export const getCookie = vi.fn(async (name: string) => {
  return cookieStore.get(name);
});

export const setCookie = vi.fn(async (name: string, value: string) => {
  cookieStore.set(name, value);
});

export const getCookies = vi.fn(async (cookies: string[]) => {
  return Promise.all(cookies.map((cookie) => getCookie(cookie)));
});

export const setCookies = vi.fn(async (cookies: Record<string, string>) => {
  return Promise.all(Object.entries(cookies).map(([name, value]) => setCookie(name, value)));
});
