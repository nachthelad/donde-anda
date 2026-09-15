export type ShareOutcome = "shared" | "copied" | "cancelled" | "unavailable";

type ShareAdapters = {
  nativeShare?: (data: ShareData) => Promise<void>;
  copyText?: (value: string) => Promise<void>;
};

function isCancellation(error: unknown): boolean {
  return typeof error === "object" && error !== null && "name" in error && error.name === "AbortError";
}

export async function shareEverywhere(
  text: string,
  url: string,
  adapters: ShareAdapters,
): Promise<ShareOutcome> {
  if (adapters.nativeShare) {
    try {
      await adapters.nativeShare({ text, url });
      return "shared";
    } catch (error) {
      if (isCancellation(error)) return "cancelled";
    }
  }

  if (adapters.copyText) {
    try {
      await adapters.copyText(`${text} ${url}`);
      return "copied";
    } catch {
      return "unavailable";
    }
  }

  return "unavailable";
}
