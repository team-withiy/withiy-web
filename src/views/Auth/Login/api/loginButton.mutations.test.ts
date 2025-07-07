import { act } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { renderHookWithProviders } from "@/shared/lib/test";

import { useSetRecentLoginedSocialTypeMutation } from "./loginButton.mutations";

test("useSetRecentLoginedSocialTypeMutation", async () => {
  window.open = vi.fn();
  const { result } = renderHookWithProviders(() => useSetRecentLoginedSocialTypeMutation());

  await act(() => result.current.mutateAsync("kakao"));
  expect(window.open).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`, "_self");
});
