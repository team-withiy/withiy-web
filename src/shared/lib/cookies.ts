"use server";

import { cookies } from "next/headers";

import { COOKIE_OPTIONS } from "../constants/cookies";

interface SetCookieOptions {
  expires?: Date;
  maxAge?: number;
}

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
};

export const setCookie = async (name: string, value: string, options?: SetCookieOptions) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { ...COOKIE_OPTIONS, ...options });
};

export const getCookies = async (cookies: string[]) => {
  return await Promise.all(cookies.map((cookie) => getCookie(cookie)));
};

export const setCookies = async (cookies: Record<string, string>, options?: SetCookieOptions) => {
  return await Promise.all(Object.entries(cookies).map(([name, value]) => setCookie(name, value, options)));
};
