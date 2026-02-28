import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMutation } from "../src/useMutation.js";

describe("useMutation", () => {
  it("handles successful mutation flow", async () => {
    const mutationFn = vi.fn(async (input: string) => `ok:${input}`);
    const onMutate = vi.fn(() => ({ trace: "ctx" }));
    const onSuccess = vi.fn();
    const onSettled = vi.fn();

    const { result } = renderHook(() =>
      useMutation<string, Error, string, { trace: string }>(mutationFn, {
        onMutate,
        onSuccess,
        onSettled,
      })
    );

    await act(async () => {
      const value = await result.current.mutateAsync("payload");
      expect(value).toBe("ok:payload");
    });

    expect(onMutate).toHaveBeenCalledWith("payload");
    expect(onSuccess).toHaveBeenCalledWith("ok:payload", "payload", undefined);
    expect(onSettled).toHaveBeenCalledWith("ok:payload", undefined, "payload", undefined);
    expect(result.current.data).toBe("ok:payload");
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("handles failed mutation flow", async () => {
    const failure = new Error("failed");
    const mutationFn = vi.fn(async () => {
      throw failure;
    });
    const onError = vi.fn();
    const onSettled = vi.fn();

    const { result } = renderHook(() =>
      useMutation<string, Error, string>(mutationFn, {
        onError,
        onSettled,
      })
    );

    let thrown: unknown;
    await act(async () => {
      try {
        await result.current.mutateAsync("payload");
      } catch (error) {
        thrown = error;
      }
    });

    expect(thrown).toBe(failure);
    expect(onError).toHaveBeenCalledWith(failure, "payload", undefined);
    expect(onSettled).toHaveBeenCalledWith(undefined, failure, "payload", undefined);
    expect(result.current.error).toBe(failure);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("supports mutate and reset", async () => {
    const mutationFn = vi.fn(async (n: number) => n + 1);
    const { result } = renderHook(() => useMutation<number, Error, number>(mutationFn));

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => expect(result.current.data).toBe(2));
    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.context).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });
});
