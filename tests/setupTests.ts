import { defaultConfig } from "antd/lib/theme/internal";
import { vi } from "vitest";

defaultConfig.hashed = false;

const localStorageMock = {
  length: 0,
  getItem: vi.fn(),
  key: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

globalThis.localStorage = localStorageMock;

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: vi.fn(),
});

class WorkerMock {
  url: string;

  onmessage: (message: unknown) => void;

  constructor(stringUrl: string) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg: unknown) {
    this.onmessage(msg);
  }
}

window.Worker = WorkerMock as unknown as typeof Worker;

if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: query.includes("max-width"),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      media: query,
      onchange: null,
    })),
  });
}

const errorLog = console.error;
Object.defineProperty(window.console, "error", {
  writable: true,
  configurable: true,
  value: (...rest: unknown[]) => {
    const logStr = rest.join("");
    if (logStr.includes("Warning: An update to %s inside a test was not wrapped in act(...)")) {
      return;
    }
    errorLog(...rest);
  },
});
