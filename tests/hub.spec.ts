import { test, expect } from "@playwright/test";

test("loads the landing page and lists available games", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Universal game hub/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /rock paper scissors/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /tic tac toe/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /wordle/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /memory/i })).toBeVisible();
});

test("captures a player name and shows it on game pages", async ({ page }) => {
  await page.goto("/");
  const nameInput = page.getByLabel(/player name/i);
  await nameInput.fill("Durgan");

  await page.getByRole("link", { name: /rock paper scissors/i }).click();
  await expect(page.getByLabel(/player name display/i)).toContainText("Durgan");

  await page.getByRole("link", { name: /tic tac toe/i }).click();
  await expect(page.getByLabel(/player name display/i)).toContainText("Durgan");

  await page.getByRole("link", { name: /wordle/i }).click();
  await expect(page.getByLabel(/player name display/i)).toContainText("Durgan");
});
