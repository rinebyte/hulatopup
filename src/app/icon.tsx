import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: huruf pertama NEXT_PUBLIC_BRAND_NAME, tanpa kotak latar. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4f46e5",
          fontSize: 60,
          fontWeight: 800,
          lineHeight: 1,
          // Font bawaan next/og hanya regular; stroke menebalkan huruf.
          WebkitTextStroke: "5px #4f46e5",
        }}
      >
        {site.name.trim().charAt(0).toUpperCase() || "T"}
      </div>
    ),
    size,
  );
}
