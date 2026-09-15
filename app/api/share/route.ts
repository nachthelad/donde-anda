import { Redis } from "@upstash/redis";
import { scenes } from "@/data/scenes";

type SharePayload = {
  sceneId?: unknown;
  rarity?: unknown;
};

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

  if (!scene) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json({ ok: false }, { status: 503 });
  }

  try {
    const redis = Redis.fromEnv();
    const pipeline = redis.pipeline();
    pipeline.hincrby("donde-anda:shares:totals", "clicks", 1);
    pipeline.hincrby("donde-anda:shares:by-date", buenosAiresDateKey(), 1);
    pipeline.hincrby("donde-anda:shares:by-rarity", scene.rarity, 1);
    pipeline.hincrby("donde-anda:shares:by-scene", scene.id, 1);
    await pipeline.exec();

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
