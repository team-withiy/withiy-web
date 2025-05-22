import { HttpResponse } from "msw";

import { localHttpHandler } from "@/app/mocks/httpHandler";

import { AuthCallbackUrlResponse, RecentLoginedSocialTypeResponse, SocialType } from "@/shared/api/auth/auth.interface";

const getRecentLoginedSocialType = localHttpHandler.get<{}, undefined, RecentLoginedSocialTypeResponse>(
  "/auth/recent-logined-social-types",
  async () => {
    return HttpResponse.json<RecentLoginedSocialTypeResponse>({
      socialType: "google",
    });
  },
);

const setRecentLoginedSocialType = localHttpHandler.post<
  {},
  { socialType: SocialType },
  RecentLoginedSocialTypeResponse
>("/auth/recent-logined-social-types", async ({ request }) => {
  const { socialType } = await request.json();
  return HttpResponse.json({ socialType });
});

const getCallbackUrl = localHttpHandler.get<{}, undefined, AuthCallbackUrlResponse>("/auth/callback-url", async () => {
  return HttpResponse.json<AuthCallbackUrlResponse>({
    callbackUrl: "/",
  });
});

const setCallbackUrl = localHttpHandler.post<{}, AuthCallbackUrlResponse, AuthCallbackUrlResponse>(
  "/auth/callback-url",
  async ({ request }) => {
    const { callbackUrl } = await request.json();
    return HttpResponse.json({ callbackUrl });
  },
);

const deleteCallbackUrl = localHttpHandler.delete("/auth/callback-url", async () => {
  return HttpResponse.json({});
});

export const authHandlers = [
  getRecentLoginedSocialType,
  setRecentLoginedSocialType,
  getCallbackUrl,
  setCallbackUrl,
  deleteCallbackUrl,
];
