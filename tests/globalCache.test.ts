import { describe, expect, it, vi } from "vitest";
import {
  getCache,
  setCache,
  setCacheError,
  subscribe,
  unsubscribe,
} from "../src/globalCache.js";

function key(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

describe("globalCache", () => {
  it("returns empty cache entry when key is missing", () => {
    const value = getCache<string>(key("missing"));
    expect(value).toEqual({});
  });

  it("stores successful values and notifies listeners", () => {
    const cacheKey = key("success");
    const listener = vi.fn();

    subscribe<string>(cacheKey, listener);
    setCache(cacheKey, "value");

    expect(getCache<string>(cacheKey)).toEqual({ data: "value", error: undefined });
    expect(listener).toHaveBeenCalledWith("value", undefined);
  });

  it("stores errors and notifies listeners", () => {
    const cacheKey = key("error");
    const listener = vi.fn();
    const error = new Error("fetch failed");

    subscribe<string>(cacheKey, listener);
    setCacheError(cacheKey, error);

    expect(getCache<string>(cacheKey)).toEqual({ data: undefined, error });
    expect(listener).toHaveBeenCalledWith(undefined, error);
  });

  it("stops notifying listeners after unsubscribe", () => {
    const cacheKey = key("unsubscribe");
    const listener = vi.fn();

    subscribe<string>(cacheKey, listener);
    unsubscribe<string>(cacheKey, listener);
    setCache(cacheKey, "later");

    expect(listener).not.toHaveBeenCalled();
  });

  it("ignores unsubscribe for unknown keys", () => {
    expect(() => unsubscribe<string>(key("unknown"), vi.fn())).not.toThrow();
  });
});
