import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { setCache } from "../src/globalCache.js";
import { useQuery } from "../src/useQuery.js";

function key(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

describe("useQuery", () => {
  it("loads data when cache is empty", async () => {
    const cacheKey = key("load");
    const fetcher = vi.fn().mockResolvedValue("loaded");

    const { result } = renderHook(() => useQuery<string>(cacheKey, fetcher));

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe("loaded");
    expect(result.current.error).toBeUndefined();
  });

  it("uses cached value without fetching again", async () => {
    const cacheKey = key("cached");
    setCache(cacheKey, "from-cache");
    const fetcher = vi.fn().mockResolvedValue("from-fetch");

    const { result } = renderHook(() => useQuery<string>(cacheKey, fetcher));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetcher).not.toHaveBeenCalled();
    expect(result.current.data).toBe("from-cache");
  });

  it("exposes fetch errors", async () => {
    const cacheKey = key("error");
    const fetchError = new Error("boom");
    const fetcher = vi.fn().mockRejectedValue(fetchError);

    const { result } = renderHook(() => useQuery<string>(cacheKey, fetcher));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(fetchError);
    expect(result.current.data).toBeUndefined();
  });

  it("refetches when requested", async () => {
    const cacheKey = key("refetch");
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce("first")
      .mockResolvedValueOnce("second");

    const { result } = renderHook(() => useQuery<string>(cacheKey, fetcher));
    await waitFor(() => expect(result.current.data).toBe("first"));

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.data).toBe("second"));
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
