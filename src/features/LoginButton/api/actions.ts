"use server";

import type { SocialType } from "@/shared/api/auth/auth.interface";
import { setOAuthStateRouteHandler } from "@/shared/api/auth/auth.router-handler";
import { getSearchParams } from "@/shared/lib/searchParams";

export const getOAuthLinkWithSetStateAction = async (socialType: SocialType) => {
  const { state } = await setOAuthStateRouteHandler();
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${socialType}?state=${state}`);
  const searchParams = getSearchParams({ state });
  url.search = searchParams.toString();

  return url.toString();
};
