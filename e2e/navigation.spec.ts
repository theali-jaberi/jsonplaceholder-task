import { expect, test } from "@playwright/test";

test("can navigate from home to user, post, and todo detail pages", async ({
  page,
}) => {
  await page.goto("/");

  // User detail
  await page.getByText("Leanne Graham").click();
  await expect(page).toHaveURL(/\/users\/1$/);
  await expect(page.getByRole("link", { name: "Back to Users" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Leanne Graham", level: 1 })
  ).toBeVisible();

  // Back to user list page
  await page.getByRole("link", { name: "Back to Users" }).click();
  await expect(page).toHaveURL(/\/users$/);
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

  // Post detail (direct navigation is deterministic with the mock API)
  await page.goto("/posts/1");
  await expect(page.getByRole("link", { name: "Back to Posts" })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Sunt aut facere repellat provident occaecati",
    })
  ).toBeVisible();

  // Todo detail
  await page.goto("/todos/1");
  await expect(page.getByRole("link", { name: "Back to Todos" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Delectus aut autem" })).toBeVisible();
});


