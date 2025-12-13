import { test, expect } from "@playwright/test";

test.describe("Multiplayer RPS", () => {
  test("can create a room and see room info", async ({ page }) => {
    await page.goto("/rps");

    // Create room
    await page.getByRole("button", { name: /create room/i }).click();

    // Room ID should appear
    const roomIdDisplay = page.getByTestId("room-id");
    await expect(roomIdDisplay).toBeVisible();
    const roomId = await roomIdDisplay.textContent();
    expect(roomId).not.toBe("");

    // Player list should show at least 1 player
    await expect(page.getByTestId("player-list")).toContainText(/player/i);
  });

  test("can join an existing room", async ({ browser }) => {
    // Host creates room
    const host = await browser.newPage();
    await host.goto("/rps");
    await host.getByRole("button", { name: /create room/i }).click();
    const roomId = await host.getByTestId("room-id").textContent();

    // Second player joins
    const guest = await browser.newPage();
    await guest.goto("/rps");
    await guest.getByLabel(/room id/i).fill(roomId || "");
    await guest.getByRole("button", { name: /join room/i }).click();

    // Both should see each other
    await expect(host.getByTestId("player-list")).toContainText(/guest/i);
    await expect(guest.getByTestId("player-list")).toContainText(/host/i);
  });

  test("players can send moves and see results", async ({ browser }) => {
    const host = await browser.newPage();
    await host.goto("/rps");
    await host.getByRole("button", { name: /create room/i }).click();
    const roomId = await host.getByTestId("room-id").textContent();

    const guest = await browser.newPage();
    await guest.goto("/rps");
    await guest.getByLabel(/room id/i).fill(roomId || "");
    await guest.getByRole("button", { name: /join room/i }).click();

    // Host plays Rock
    await host.getByRole("button", { name: /rock/i }).click();

    // Guest plays Scissors
    await guest.getByRole("button", { name: /scissors/i }).click();

    // Both should see a result
    await expect(host.getByTestId("result")).toBeVisible();
    await expect(guest.getByTestId("result")).toBeVisible();
  });
});
