import "./globals.css";

import Masthead from "@/components/Masthead";
import SiteFooter from "@/components/SiteFooter";
import Spine from "@/components/Spine";
import { getLedger } from "@/lib/posts";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

const pretendard = localFont({
  src: "../public/_fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

/* Dot-matrix printer face; subset, see scripts/subset-dot-font.sh. */
const galmuri = localFont({
  src: "../public/_fonts/GalmuriMono11-ledger.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-galmuri",
});

export const metadata: Metadata = {
  title: "nomoreviolence — A blog by Jihoon LEE",
  description: "A personal blog by Jihoon LEE",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e4ece7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d271f" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { entries } = await getLedger();
  const first = entries.at(0);
  const last = entries.at(-1);

  return (
    <html lang="ko" className={`${pretendard.variable} ${galmuri.variable}`}>
      <body className="font-sans antialiased">
        <div className="min-h-dvh spine-grid">
          <Spine since={first?.year ?? new Date().getFullYear()} />
          <div className="flex min-h-dvh min-w-0 flex-col">
            <div className="bg-guilloche">
              <div className="mx-auto w-full max-w-5xl px-5 pt-6 sm:px-10 sm:pt-8 lg:px-16 lg:pt-12">
                <Masthead openedIso={first?.iso} />
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 sm:px-10 lg:px-16">
              <Suspense>
                <main className="flex-1">{children}</main>
              </Suspense>
              <SiteFooter firstYear={first?.year} lastYear={last?.year} />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
