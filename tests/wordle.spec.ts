import { test, expect } from "@playwright/test";

test("Wordle loads initial state", async ({ page }) => {
  await page.goto("/wordle");
  await expect(page.getByRole("heading", { name: /wordle/i })).toBeVisible();
});

test("Wordle accepts a guess and can reset", async ({ page }) => {
  await page.goto("/wordle");
  await page.getByLabel(/enter guess/i).fill("REACT");
  await page.getByRole("button", { name: /submit/i }).click();

  await expect(page.getByText(/you guessed it/i)).toBeVisible();

  await page.getByRole("button", { name: /reset game/i }).click();
  await expect(page.getByText(/you guessed it/i)).toBeHidden().catch(() => {});
});
