import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

describe("src/components/ui/ErrorDisplay", () => {
  test("renders the message and calls onRetry when provided", async () => {
    const user = userEvent.setup();
    const onRetry = jest.fn();

    render(<ErrorDisplay message="Something broke" onRetry={onRetry} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Something broke")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test("does not render retry button when onRetry is not provided", () => {
    render(<ErrorDisplay message="No retry" />);
    expect(screen.queryByRole("button", { name: "Try Again" })).toBeNull();
  });
});


