import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RecentTodoList } from "@/components/features/todos/list/RecentTodoList";

import { fixtures } from "../../../test/msw/handlers";

describe("RecentTodoList (integration)", () => {
  test("renders todos and supports filtering", async () => {
    const user = userEvent.setup();

    render(<RecentTodoList />);

    // Wait for data to load (titles are rendered with first-letter capitalization)
    const firstTodoTitle =
      fixtures.todos[0].title.charAt(0).toUpperCase() +
      fixtures.todos[0].title.slice(1);

    await screen.findByText(firstTodoTitle);

    const total = fixtures.todos.length;
    const completed = fixtures.todos.filter((t) => t.completed).length;
    const pending = fixtures.todos.filter((t) => !t.completed).length;

    expect(
      screen.getByRole("button", { name: new RegExp(`All\\s*\\(${total}\\)`) })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: new RegExp(`Pending\\s*\\(${pending}\\)`),
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: new RegExp(`Completed\\s*\\(${completed}\\)`),
      })
    ).toBeInTheDocument();

    // Switch to "Completed" view
    await user.click(screen.getByRole("button", { name: /Completed/ }));

    const aCompleted = fixtures.todos.find((t) => t.completed);
    const aPending = fixtures.todos.find((t) => !t.completed);

    expect(aCompleted).toBeTruthy();
    expect(aPending).toBeTruthy();

    const completedTitle =
      aCompleted!.title.charAt(0).toUpperCase() + aCompleted!.title.slice(1);
    const pendingTitle =
      aPending!.title.charAt(0).toUpperCase() + aPending!.title.slice(1);

    expect(await screen.findByText(completedTitle)).toBeInTheDocument();
    expect(screen.queryByText(pendingTitle)).toBeNull();
  });
});


