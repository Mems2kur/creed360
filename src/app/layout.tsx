import type { Metadata } from "next";
// Fonts are self-hosted from npm (Fontsource), so builds never depend on reaching Google Fonts.
import "@fontsource-variable/inter";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Creed 360 — Make smarter property decisions", template: "%s · Creed 360" },
  description:
    "Property Search & Advisory · Verification · Surveying · Geospatial Intelligence. We verify before you buy or build.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
