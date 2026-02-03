import { render, screen } from "@testing-library/react";

import { RecentPostList } from "@/components/features/posts/list/RecentPostList";

import { fixtures } from "../../../test/msw/handlers";

describe("RecentPostList (integration)", () => {
  test("shows a 'Show All' link when there are more than 6 posts", async () => {
    render(<RecentPostList />);

    // Wait for posts to load
    const firstPostTitle =
      fixtures.posts[0].title.charAt(0).toUpperCase() +
      fixtures.posts[0].title.slice(1);
    await screen.findByText(firstPostTitle);

    expect(
      screen.getByRole("link", {
        name: `Show All ${fixtures.posts.length} Posts`,
      })
    ).toBeInTheDocument();

    // Only 6 cards render on the home page
    const readMoreLinks = screen.getAllByRole("link", { name: /Read more/ });
    expect(readMoreLinks).toHaveLength(6);
  });
});


