// Runs after jest.setup.globals.ts; provides fetch/Response and BroadcastChannel for MSW.
import { fetch, Headers, Request, Response } from "undici";

Object.assign(globalThis, { fetch, Headers, Request, Response });

// MSW's WebSocket utilities expect BroadcastChannel; JSDOM doesn't implement it.
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
