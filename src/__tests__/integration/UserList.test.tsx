import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import { UserList } from "@/components/features/users/list/UserList";

import { fixtures } from "../../../test/msw/handlers";
import { server } from "../../../test/msw/server";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

describe("UserList (integration)", () => {
  test("renders users from the API", async () => {
    render(<UserList />);

    expect(
      screen.getByRole("heading", { name: "Users" })
    ).toBeInTheDocument();

    expect(await screen.findByText(fixtures.users[0].name)).toBeInTheDocument();
    expect(screen.getByText(fixtures.users[1].name)).toBeInTheDocument();
  });

  test("shows an error and can retry", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(USERS_URL, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "Server Error",
        });
      })
    );

    render(<UserList />);

    expect(
      await screen.findByText("Failed to fetch /users: Server Error")
    ).toBeInTheDocument();

    // Next request succeeds
    server.use(http.get(USERS_URL, () => HttpResponse.json(fixtures.users)));

    await user.click(screen.getByRole("button", { name: "Try Again" }));

    expect(await screen.findByText(fixtures.users[0].name)).toBeInTheDocument();
  });
});


