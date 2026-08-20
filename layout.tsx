import type { Metadata, Viewport } from "next";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wawu Meals — Order Now",
  description: "Spice up your taste buds. Scan, browse, order — pay by bank transfer."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#171210"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
