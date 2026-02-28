import { describe, expect, it } from "vitest";
import { useMutation, useQuery, useQueryClient } from "../src/index.js";

describe("package entrypoint", () => {
  it("re-exports core hooks", () => {
    expect(typeof useQuery).toBe("function");
    expect(typeof useMutation).toBe("function");
    expect(typeof useQueryClient).toBe("function");
  });
});
