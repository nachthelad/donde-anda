import { Redis } from "@upstash/redis";
import { scenes } from "@/data/scenes";

type SharePayload = {
  sceneId?: unknown;
  rarity?: unknown;
  source?: unknown;
};

const shareSources = ["x", "native"] as const;

function buenosAiresDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function POST(request: Request) {
  let payload: SharePayload;

  try {
    payload = (await request.json()) as SharePayload;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const scene = scenes.find(
    (candidate) => candidate.id === payload.sceneId && candidate.rarity === payload.rarity,
  );
  const source = shareSources.find((candidate) => candidate === payload.source);

  if (!scene || !source) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!redisUrl || !redisToken) {
    console.error(JSON.stringify({
      level: "error",
      message: "Share metrics configuration is missing",
    }));
    return Response.json({ ok: false }, { status: 503 });
  }

  try {
    const redis = new Redis({ url: redisUrl, token: redisToken });
    const pipeline = redis.pipeline();
    pipeline.hincrby("donde-anda:shares:totals", "clicks", 1);
    pipeline.hincrby("donde-anda:shares:by-date", buenosAiresDateKey(), 1);
    pipeline.hincrby("donde-anda:shares:by-rarity", scene.rarity, 1);
    pipeline.hincrby("donde-anda:shares:by-scene", scene.id, 1);
    pipeline.hincrby("donde-anda:shares:by-source", source, 1);
    await pipeline.exec();

    return Response.json({ ok: true });
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      message: "Share metric write failed",
      errorType: error instanceof Error ? error.name : "UnknownError",
    }));
    return Response.json({ ok: false }, { status: 503 });
  }
}
