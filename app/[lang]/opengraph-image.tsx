import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

/** Rendered once per language at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const alt = `${siteConfig.name.en} — ${siteConfig.role.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card shared by every page: the portrait on the right, name and
 * headline on the left. Text is set in English for both languages (the
 * card renderer's built-in font has no Arabic glyphs).
 */
export default async function OpenGraphImage() {
  // A resized copy of the portrait (public/images/portrait-og.jpg) keeps this fast.
  const portrait = await readFile(join(process.cwd(), "public/images/portrait-og.jpg"));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "radial-gradient(circle at 78% 30%, #4a1400 0%, #160600 58%)",
        color: "#f6ede3",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 700 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, color: "#cdbcad", textTransform: "uppercase" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ff9800" }} />
          {siteConfig.name.en} / {siteConfig.role.en}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>
          <span>Turning Ideas</span>
          <span style={{ color: "#ff9800" }}>Into Digital</span>
          <span>Experiences.</span>
        </div>
        <div style={{ display: "flex", height: 2, width: 220, background: "linear-gradient(90deg, #ff9800, transparent)" }} />
      </div>
      <div style={{ display: "flex", position: "relative", width: 500, height: 630 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by next/og, not the DOM */}
        <img src={portraitSrc} width={504} height={630} alt="" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #160600 0%, rgba(22,6,0,0) 30%)" }} />
      </div>
    </div>,
    size,
  );
}
