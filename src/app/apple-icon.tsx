import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Ikon home screen iOS & logo Organization (JSON-LD). iOS butuh latar solid. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#4f46e5",
          fontSize: 140,
          lineHeight: 1,
          // Font bawaan next/og hanya regular; stroke menebalkan huruf.
          WebkitTextStroke: "12px #4f46e5",
        }}
      >
        {site.name.trim().charAt(0).toUpperCase() || "T"}
      </div>
    ),
    size,
  );
}
