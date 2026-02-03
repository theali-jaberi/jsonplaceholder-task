import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useApi } from "@/hooks/useApi";

function UseApiHarness({
  fetchFn,
  immediate = true,
}: {
  fetchFn: () => Promise<string>;
  immediate?: boolean;
}) {
  const { data, loading, error, refetch } = useApi(fetchFn, immediate);

  return (
    <div>
      <div>{`loading:${loading ? "yes" : "no"}`}</div>
      <div>{`data:${data ?? "null"}`}</div>
      <div>{`error:${error ?? "null"}`}</div>
      <button onClick={refetch}>refetch</button>
    </div>
  );
}

describe("src/hooks/useApi", () => {
  test("fetches immediately by default and populates data", async () => {
    const fetchFn = jest.fn().mockResolvedValue("hello");

    render(<UseApiHarness fetchFn={fetchFn} />);

    expect(screen.getByText("loading:yes")).toBeInTheDocument();
    await waitFor(() => expect(fetchFn).toHaveBeenCalledTimes(1));

    expect(await screen.findByText("data:hello")).toBeInTheDocument();
    expect(screen.getByText("loading:no")).toBeInTheDocument();
    expect(screen.getByText("error:null")).toBeInTheDocument();
  });

  test("captures errors and exposes them as strings", async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error("boom"));

    render(<UseApiHarness fetchFn={fetchFn} />);

    expect(await screen.findByText("error:boom")).toBeInTheDocument();
    expect(screen.getByText("loading:no")).toBeInTheDocument();
    expect(screen.getByText("data:null")).toBeInTheDocument();
  });

  test("refetch triggers the fetch function again", async () => {
    const user = userEvent.setup();
    const fetchFn = jest
      .fn()
      .mockResolvedValueOnce("first")
      .mockResolvedValueOnce("second");

    render(<UseApiHarness fetchFn={fetchFn} />);

    expect(await screen.findByText("data:first")).toBeInTheDocument();
    expect(fetchFn).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "refetch" }));

    expect(await screen.findByText("data:second")).toBeInTheDocument();
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });
});


