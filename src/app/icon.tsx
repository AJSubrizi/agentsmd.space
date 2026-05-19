import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          borderRadius: 12,
        }}
      >
        .md
      </div>
    ),
    { ...size },
  );
}
