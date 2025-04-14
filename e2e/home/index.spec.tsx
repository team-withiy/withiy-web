import { expect, test } from "@playwright/test";

test.describe("HomePage", () => {
  test("should render the home page", async ({ page }) => {
    await page.goto("/");
    const title = page.locator("h1");
    await expect(title).toHaveText("Home");
  });
});
