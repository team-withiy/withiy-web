import { expect, test } from "@playwright/test";

test.describe("HomePage", () => {
  test("should render the home page", async ({ page }) => {
    await page.goto("/");
    const mswData = await page.getByTestId("mswData").innerText();
    expect(mswData).toBe('{"data":{"name":"rldnd","age":28}}');
  });
});
