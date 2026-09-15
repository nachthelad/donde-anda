import { ImageResponse } from "next/og";
import { SCOOTER_ICON_PATH } from "@/components/scooter-icon";

export const socialImageAlt = "¿Dónde anda? Descubrí dónde anda tu delivery hoy";
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

export function generateSocialImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ebeef2",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: 520,
          height: 560,
          display: "flex",
          flexDirection: "column",
          background: "white",
          borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(0,0,0,.18)",
        }}
      >
        <div style={{ height: 72, background: "#ffe600", display: "flex", alignItems: "center", padding: "0 34px", fontSize: 26, fontWeight: 800 }}>
          ¿DÓNDE ANDA?
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#dce4df", color: "#202020" }}>
          <div style={{ width: 126, height: 126, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 63, border: "12px solid white", background: "#202020", color: "white", boxShadow: "0 8px 18px rgba(0,0,0,.18)" }}>
            <svg width="80" height="80" viewBox="0 0 24 24">
              <path fill="#ffffff" d={SCOOTER_ICON_PATH} />
            </svg>
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, marginTop: 28 }}>¿Dónde anda el tuyo?</div>
          <div style={{ fontSize: 25, marginTop: 14, color: "#53605a" }}>Un resultado nuevo cada día</div>
        </div>
      </div>
    </div>,
    socialImageSize,
  );
}
