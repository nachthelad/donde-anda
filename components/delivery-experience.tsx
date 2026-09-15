"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ScooterIcon } from "@/components/scooter-icon";
import type { Scene } from "@/data/scenes";
import { getDailyScene } from "@/lib/daily-scene";
import { toShareHeadline } from "@/lib/share-copy";

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <path d="M5 12h2v7H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Zm14 0h-2v7h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

function ShareNodesIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="5" r="3" />
      <circle cx="18" cy="19" r="3" />
    </svg>
  );
}

function mapVariantFor(scene: Scene | null) {
  if (!scene) return 1;
  const hash = [...scene.id].reduce((value, character) => ((value * 31) + character.charCodeAt(0)) >>> 0, 0);
  return (hash % 3) + 1;
}

function SceneMarker({ scene }: { scene: Scene | null }) {
  const spriteColumn = scene?.sprite ? scene.sprite.index % 4 : 0;
  const spriteRow = scene?.sprite ? Math.floor(scene.sprite.index / 4) : 0;

  return (
    <div className="scene-marker" aria-hidden="true">
      {scene?.iconSrc ? (
        <Image src={scene.iconSrc} alt="" width={96} height={96} priority className="scene-marker-image" />
      ) : scene?.sprite ? (
        <span className="sprite-window">
          <Image
            src={scene.sprite.src}
            alt=""
            width={1792}
            height={1024}
            sizes="248px"
            priority
            className="scene-marker-sprite"
            style={{ left: `${spriteColumn * -62}px`, top: `${spriteRow * -71}px` }}
          />
        </span>
      ) : (
        <span className="scene-marker-emoji">{scene?.icon ?? "🛵"}</span>
      )}
    </div>
  );
}

export function DeliveryExperience() {
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setScene(getDailyScene(window.localStorage));
      } catch {
        const memoryStorage = new Map<string, string>();
        setScene(
          getDailyScene({
            getItem: (key) => memoryStorage.get(key) ?? null,
            setItem: (key, value) => void memoryStorage.set(key, value),
            removeItem: (key) => void memoryStorage.delete(key),
            clear: () => memoryStorage.clear(),
            key: (index) => [...memoryStorage.keys()][index] ?? null,
            get length() { return memoryStorage.size; },
          }),
        );
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const shareHref = useMemo(() => {
    if (!scene || typeof window === "undefined") return "https://x.com/intent/tweet";
    const shareHeadline = toShareHeadline(scene.headline);
    const text = `${shareHeadline}. ¿Dónde anda el tuyo?`;
    const url = window.location.origin;
    return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  }, [scene]);

  const mapVariant = mapVariantFor(scene);

  return (
    <main className="stage">
      <section className={`phone-shell ${scene ? "is-ready" : "is-loading"}`} aria-label="Seguimiento ficticio de un pedido">
        <div className={`map map-variant-${mapVariant}`}>
          <button className="round-control back" tabIndex={-1} aria-hidden="true">‹</button>
          <button className="round-control audio" tabIndex={-1} aria-hidden="true"><HeadphonesIcon /></button>
          <div className="map-pin"><span /></div>
          <div className="shop-label shop-label-one"><span className="shop-dot blue">▣</span> Óptica Horizonte</div>
          <SceneMarker scene={scene} />
          <button className="round-control locate" tabIndex={-1} aria-hidden="true">⌾</button>
        </div>

        <section className="tracking-card">
          <h1 className="tracking-headline" aria-live="polite">
            {scene?.headline ?? <span className="headline-skeleton" />}
          </h1>
          <div className="progress" aria-hidden="true">
            <span className="progress-dot start" />
            <span className="progress-line done" />
            <span className="progress-dot middle" />
            <span className="progress-line done second" />
            <span className="truck-dot"><ScooterIcon /></span>
            <span className="progress-line pending" />
            <span className="progress-dot end" />
          </div>
          <div className="code-box">
            <span>Clave</span>
            <span className="code-value">MATE <ShareNodesIcon /></span>
          </div>
          <span className="detail-link">
            <span>Detalle del envío</span>
            <svg aria-hidden="true" viewBox="0 0 12 8" width="12" height="8">
              <path d="m1 1.25 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </section>

        <a
          className="share-button"
          href={shareHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!scene}
          tabIndex={scene ? 0 : -1}
          onClick={() => {
            if (!scene) return;
            void fetch("/api/share", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ sceneId: scene.id, rarity: scene.rarity }),
              keepalive: true,
            }).catch(() => undefined);
          }}
        >
          <XIcon />
          <span>¡Compartilo!</span>
        </a>

        <section className="purchase-card">
          <h2>Detalle de la compra</h2>
          <div className="purchase-row">
            <div>Creado por <a href="https://nachthelad.com.ar" target="_blank" rel="noopener noreferrer">nachthelad</a></div>
            <p className="parody-note">Parodia no afiliada a Mercado Libre.</p>
          </div>
        </section>
      </section>
    </main>
  );
}
