import { describe, expect, it, vi } from "vitest";
import { getCache } from "../src/globalCache.js";
import { useQueryClient } from "../src/useQueryClient.js";

function key(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("useQueryClient", () => {
  it("sets and gets query data", () => {
    const client = useQueryClient();
    const cacheKey = key("set-get");

    client.setQueryData(cacheKey, { id: 1 });

    expect(client.getQueryData<{ id: number }>(cacheKey)).toEqual({ id: 1 });
  });

  it("invalidates and refetches successfully", async () => {
    const client = useQueryClient();
    const cacheKey = key("invalidate-success");
    const refetch = vi.fn().mockResolvedValue({ fresh: true });

    client.invalidateQuery(cacheKey, refetch);
    await flush();

    expect(refetch).toHaveBeenCalledTimes(1);
    expect(client.getQueryData<{ fresh: boolean }>(cacheKey)).toEqual({ fresh: true });
  });

  it("stores error when refetch fails", async () => {
    const client = useQueryClient();
    const cacheKey = key("invalidate-error");
    const refetchError = new Error("network down");
    const refetch = vi.fn().mockRejectedValue(refetchError);

    client.invalidateQuery(cacheKey, refetch);
    await flush();

    const cached = getCache<unknown>(cacheKey);
    expect(cached.data).toBeUndefined();
    expect(cached.error).toBe(refetchError);
  });

  it("invalidates without refetch by resetting data", () => {
    const client = useQueryClient();
    const cacheKey = key("invalidate-without-refetch");

    client.setQueryData(cacheKey, "stale");
    client.invalidateQuery(cacheKey);

    expect(client.getQueryData(cacheKey)).toBeUndefined();
  });

  it("clears query data", () => {
    const client = useQueryClient();
    const cacheKey = key("clear");

    client.setQueryData(cacheKey, "value");
    client.clearQuery(cacheKey);

    expect(client.getQueryData(cacheKey)).toBeUndefined();
  });
});
