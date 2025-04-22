import { faker } from "@faker-js/faker";
import { HttpResponse } from "msw";

import { localHttpHandler } from "@/app/mocks/httpHandler";

import { OAuthStateResponse } from "app/api/auth/state/route";

faker.seed(1);

const setOAuthState = localHttpHandler.post<{}, undefined, OAuthStateResponse>("/auth/state", () => {
  return HttpResponse.json({
    state: faker.string.alphanumeric({ length: 32 }),
  });
});

export const authHandlers = [setOAuthState];
