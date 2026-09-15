import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/share/route";

const mocks = vi.hoisted(() => ({
  options: vi.fn(),
  hincrby: vi.fn(),
  exec: vi.fn().mockResolvedValue([]),
}));

vi.mock("@upstash/redis", () => ({
  Redis: class {
    constructor(options: unknown) { mocks.options(options); }
    pipeline() { return { hincrby: mocks.hincrby, exec: mocks.exec }; }
  },
}));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("share metrics endpoint", () => {
  it("uses Vercel Marketplace KV aliases and increments four aggregate counters", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("KV_REST_API_URL", "https://redis.example.test");
    vi.stubEnv("KV_REST_API_TOKEN", "test-token");

    const response = await POST(new Request("https://example.test/api/share", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sceneId: "mate-stop", rarity: "common" }),
    }));

    expect(response.status).toBe(200);
    expect(mocks.options).toHaveBeenCalledWith({ url: "https://redis.example.test", token: "test-token" });
    expect(mocks.hincrby).toHaveBeenCalledTimes(4);
    expect(mocks.exec).toHaveBeenCalledOnce();
  });
});
