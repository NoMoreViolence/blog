import "./globals.css";

import ErrorFallback from "@/components/ErrorFallback";
import HomeLink from "@/components/HomeLink";
import Link from "@/components/Link";
import clsx from "clsx";
import type { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import localFont from "next/font/local";
import { Suspense } from "react";

const pretendard = localFont({
  src: "../public/_fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "nomoreviolence — A blog by Jihoon LEE",
  description: "A personal blog by Jihoon LEE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body
        className={clsx(
          pretendard.className,
          "mx-auto max-w-2xl px-5 py-12 text-[--text] bg-[--bg]"
        )}
      >
        <header className="flex flex-row place-content-between">
          <HomeLink />
        </header>

        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense>
            <main className="mt-14">{children}</main>
          </Suspense>
        </ErrorBoundary>

        <footer className="mt-14">
          <div className="flex flex-row gap-x-4">
            <Link
              href="mailto://ljh86029926@gmail.com"
              className="text-[13px] underline"
            >
              ljh86029926@gmail.com
            </Link>
            <Link
              href="https://www.linkedin.com/in/ljh000323/"
              className="text-[13px] underline"
              target="_blank"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/NoMoreViolence"
              className="text-[13px] underline"
              target="_blank"
            >
              Github
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
