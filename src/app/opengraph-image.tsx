import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

export const alt = `${site.name} — Topup Mobile Legends, Genshin Impact & Roblox`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function dataUrl(publicPath: string) {
  const buf = await readFile(join(process.cwd(), "public", publicPath));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

// Dibaca sekali saat modul dimuat agar gambar bisa diprerender statis.
const [bg, ...icons] = await Promise.all([
  dataUrl(games[0].images.banner),
  ...games.map((g) => dataUrl(g.images.icon)),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#f5f7fc" }}>
        <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, #ffffff 32%, rgba(255,255,255,0.88) 55%, rgba(255,255,255,0))",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 72, position: "relative" }}>
          <div style={{ color: "#4f46e5", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>{site.name}</div>
          <div style={{ marginTop: 36, color: "#0f172a", fontSize: 64, fontWeight: 800, lineHeight: 1.05, maxWidth: 700 }}>
            Topup game instan, murah & terpercaya
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
            {icons.map((src, i) => (
              <img key={i} src={src} alt="" width={88} height={88} style={{ borderRadius: 22, border: "4px solid #ffffff", boxShadow: "0 8px 24px rgba(15,23,42,0.18)" }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
