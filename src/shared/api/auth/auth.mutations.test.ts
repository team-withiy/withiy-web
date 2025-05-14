import { describe, expect, test } from "vitest";

import { SOCIAL_TYPE } from "@/shared/constants/auth";

import { setRecentLoginedSocialTypeApi } from "./auth.mutations";

describe("setRecentLoginedSocialTypeApi", () => {
  test("socialType에 따라 api를 호출한다.", async () => {
    await Promise.all(
      SOCIAL_TYPE.map(async (socialType) => {
        const data = await setRecentLoginedSocialTypeApi(socialType);
        expect(data).toEqual({ socialType });
      }),
    );
  });
});
