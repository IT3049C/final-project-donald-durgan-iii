import { test, expect } from "@playwright/test";

test("Tic Tac Toe loads initial state", async ({ page }) => {
  await page.goto("/tic-tac-toe");
  await expect(page.getByRole("heading", { name: /tic tac toe/i })).toBeVisible();
  await expect(page.getByText(/next player: x/i)).toBeVisible();
});

test("Tic Tac Toe interaction and reset", async ({ page }) => {
  await page.goto("/tic-tac-toe");

  const square1 = page.getByRole("button", { name: /square 1/i });
  await square1.click();
  await expect(square1).toHaveText("X");

  await page.getByRole("button", { name: /reset game/i }).click();
  await expect(square1).toHaveText("");
});
