import { expect, test } from "@playwright/test";

test("home renders users, posts, and todos from the mock API", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  await expect(page.getByText("Leanne Graham")).toBeVisible();

  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  await expect(
    page.getByText("Sunt aut facere repellat provident occaecati")
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Show All 7 Posts" })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Todos" })).toBeVisible();
  await expect(page.getByText("Delectus aut autem")).toBeVisible();

  // Filter interaction
  await page.getByRole("button", { name: /Completed/ }).click();
  await expect(page.getByText("Quis ut nam facilis et officia qui")).toBeVisible();
  await expect(page.getByText("Delectus aut autem")).toBeHidden();
});


