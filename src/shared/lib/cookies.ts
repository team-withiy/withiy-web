"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
};

export const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { httpOnly: true, domain: process.env.NEXT_PUBLIC_BASE_URL, path: "/" });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

export const getCookies = async (cookies: string[]) => {
  return await Promise.all(cookies.map((cookie) => getCookie(cookie)));
};

export const setCookies = async (cookies: Record<string, string>) => {
  return await Promise.all(Object.entries(cookies).map(([name, value]) => setCookie(name, value)));
};

export const deleteCookies = async (cookies: string[]) => {
  return await Promise.all(cookies.map((cookie) => deleteCookie(cookie)));
};
