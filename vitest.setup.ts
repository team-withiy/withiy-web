import type { ReactNode } from "react";

import { config } from "dotenv";
import { resolve } from "path";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import { matchers } from "vitest-console";

import { server } from "@/app/mocks/server";

// MEMO: vitest matchers
import "@testing-library/jest-dom/vitest";

// MEMO: vitest-console
expect.extend(matchers);

// MEMO: dotenv
config({ path: resolve(__dirname, "env/.env.test") });

// MEMO: msw
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// MEMO: react portal
vi.mock("react-dom", async () => {
  const actual = await vi.importActual("react-dom");
  return {
    ...actual,
    createPortal: (node: ReactNode) => node,
  };
});
