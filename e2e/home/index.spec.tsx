import { test } from "@playwright/test";

test.describe("HomePage", () => {
  test("should render the home page", async ({ page }) => {
    await page.goto("/");
  });
});
