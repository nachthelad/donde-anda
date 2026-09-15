import { describe, expect, it, vi } from "vitest";
import { shareEverywhere } from "@/lib/share-everywhere";

describe("share everywhere", () => {
  it("uses the native share sheet when available", async () => {
    const nativeShare = vi.fn().mockResolvedValue(undefined);
    const copyText = vi.fn();

    await expect(shareEverywhere("Resultado", "https://example.test", { nativeShare, copyText }))
      .resolves.toBe("shared");
    expect(nativeShare).toHaveBeenCalledWith({ text: "Resultado", url: "https://example.test" });
    expect(copyText).not.toHaveBeenCalled();
  });

  it("copies text and URL when native sharing is unavailable", async () => {
    const copyText = vi.fn().mockResolvedValue(undefined);

    await expect(shareEverywhere("Resultado", "https://example.test", { copyText }))
      .resolves.toBe("copied");
    expect(copyText).toHaveBeenCalledWith("Resultado https://example.test");
  });

  it("does not copy when the user cancels the native share sheet", async () => {
    const nativeShare = vi.fn().mockRejectedValue({ name: "AbortError" });
    const copyText = vi.fn();

    await expect(shareEverywhere("Resultado", "https://example.test", { nativeShare, copyText }))
      .resolves.toBe("cancelled");
    expect(copyText).not.toHaveBeenCalled();
  });
});
