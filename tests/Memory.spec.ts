import { test, expect } from "@playwright/test";

test.describe("Memory Game", () => {
  test("loads the Memory game initial state", async ({ page }) => {
    await page.goto("/memory");

    // Heading is visible
    await expect(
      page.getByRole("heading", { name: /memory cards/i })
    ).toBeVisible();

    // Grid of cards exists
    const grid = page.getByRole("grid", { name: /memory cards/i });
    await expect(grid).toBeVisible();

    // Cards should initially show "?"
    const firstCard = page.getByRole("button", { name: /card 0/i });
    await expect(firstCard).toHaveText("?");
  });

  test("allows flipping cards", async ({ page }) => {
    await page.goto("/memory");

    const card0 = page.getByRole("button", { name: /card 0/i });
    const card1 = page.getByRole("button", { name: /card 1/i });

    // Flip first card
    await card0.click();
    await expect(card0).not.toHaveText("?");

    // Flip second card
    await card1.click();
    await expect(card1).not.toHaveText("?");
  });

  test("reset returns the game to initial state", async ({ page }) => {
    await page.goto("/memory");

    const card0 = page.getByRole("button", { name: /card 0/i });

    // Flip a card
    await card0.click();
    await expect(card0).not.toHaveText("?");

    // Reset the game
    await page.getByRole("button", { name: /reset game/i }).click();

    // After reset, card should be face-down again
    await expect(card0).toHaveText("?");
  });
});
