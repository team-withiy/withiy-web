import { config } from "dotenv";
import { resolve } from "path";
import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "@/app/mocks/server";

import "@testing-library/jest-dom/vitest";

config({ path: resolve(__dirname, "env/.env.test") });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
