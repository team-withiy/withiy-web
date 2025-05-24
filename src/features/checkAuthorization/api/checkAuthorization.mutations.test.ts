import { act } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { expect, test, vi } from "vitest";

import { renderHookWithProviders } from "@/shared/lib/test";

import { useSetCallbackUrlMutation } from "./checkAuthorization.mutations";

test("useSetCallbackUrlMutation", async () => {
  await mockRouter.push("/");
  const { result } = renderHookWithProviders(() => useSetCallbackUrlMutation());
  const mutateAsyncSpy = vi.spyOn(result.current, "mutateAsync");

  await act(() => result.current.mutateAsync("/"));
  expect(mutateAsyncSpy).toHaveBeenCalledWith("/");
  expect(mockRouter).toMatchObject(expect.objectContaining({ pathname: "/auth" }));
});
