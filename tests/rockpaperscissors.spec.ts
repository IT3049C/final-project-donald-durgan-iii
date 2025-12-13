import { test, expect } from "@playwright/test";

test("RPS loads initial state", async ({ page }) => {
  await page.goto("/rps");
  await expect(page.getByRole("heading", { name: /rock paper scissors/i })).toBeVisible();
  await expect(page.getByText(/player move:/i)).toBeVisible();
});

test("RPS allows playing and resetting", async ({ page }) => {
  await page.goto("/rps");
  await page.getByRole("button", { name: /play rock/i }).click();
  await expect(page.getByText(/player move: rock/i)).toBeVisible();

  await page.getByRole("button", { name: /reset game/i }).click();
  await expect(page.getByText(/player move: -/i)).toBeVisible();
});
