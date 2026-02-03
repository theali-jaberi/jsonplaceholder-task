import { api, ApiError } from "@/services/api";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

describe("src/services/api", () => {
  test("getUsers calls /users", async () => {
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }],
    } as unknown as Response);

    await api.getUsers();

    expect(fetchSpy).toHaveBeenCalledWith(`${baseUrl}/users`);
  });

  test("getPosts includes ?userId= when provided", async () => {
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as unknown as Response);

    await api.getPosts("123");

    expect(fetchSpy).toHaveBeenCalledWith(`${baseUrl}/posts?userId=123`);
  });

  test("throws ApiError on non-OK response", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Server Error",
    } as unknown as Response);

    let err: unknown;
    try {
      await api.getUsers();
    } catch (e) {
      err = e;
    }

    expect(err).toBeInstanceOf(ApiError);
    expect(err).toMatchObject({ name: "ApiError", status: 500 });
  });
});


