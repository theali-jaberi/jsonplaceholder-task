import "@testing-library/jest-dom";
import React from "react";
import { TextDecoder, TextEncoder } from "node:util";
import { ReadableStream, TransformStream, WritableStream } from "node:stream/web";

// JSDOM doesn't provide some Web API globals Node packages may expect.
Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  ReadableStream,
  TransformStream,
  WritableStream,
});

import { fetch, Headers, Request, Response } from "undici";

// JSDOM also doesn't provide Fetch API globals by default. MSW expects these to exist.
Object.assign(globalThis, { fetch, Headers, Request, Response });

// MSW's WebSocket utilities expect BroadcastChannel to exist, but JSDOM doesn't
// implement it.
if (!("BroadcastChannel" in globalThis)) {
  class BroadcastChannelPolyfill {
    name: string;
    onmessage: ((event: MessageEvent) => void) | null = null;
    onmessageerror: ((event: MessageEvent) => void) | null = null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage(_message: unknown) {
      // no-op
    }

    close() {
      // no-op
    }

    addEventListener() {
      // no-op
    }

    removeEventListener() {
      // no-op
    }

    dispatchEvent() {
      return false;
    }
  }

  (globalThis as Record<string, unknown>).BroadcastChannel = BroadcastChannelPolyfill;
}

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


