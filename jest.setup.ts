import "@testing-library/jest-dom";
import React from "react";
import { server } from "./test/msw/server";

// Prevent tests from accidentally hitting the real network.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Next.js' <Link> adds routing behavior that's not needed for component tests.
jest.mock("next/link", () => {

  return function Link({ href, children, ...props }: { href: string | { pathname: string }; children: React.ReactNode;[key: string]: unknown }) {
    const resolvedHref =
      typeof href === "string" ? href : href?.pathname ?? "#";
    return React.createElement("a", { href: resolvedHref, ...props }, children);
  };
});


