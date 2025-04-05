import { config } from "dotenv";
import { resolve } from "path";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { matchers } from "vitest-console";

import { server } from "@/app/mocks/server";

import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

config({ path: resolve(__dirname, "env/.env.test") });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
