import { LedgerHead, SheetHead } from "@/components/ledger/LedgerParts";
import LedgerRow from "@/components/ledger/LedgerRow";
import { getLedger } from "@/lib/posts";
import type { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "이지훈의 블로그",
  description: "A personal blog by Jihoon LEE",
};

const RECENT = 3;

export default async function Home() {
  const { entries } = await getLedger();
  const recent = entries.slice(-RECENT);
  const newest = entries.at(-1);

  return (
    <>
      <section className="mt-16 max-w-2xl md:mt-20">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">
          소프트웨어와 게임을 만듭니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-pretty">
          7년 반간 개발자로 일하다 나와서, 지금은 혼자 니치 소프트웨어와
          하이퍼캐주얼 게임을 만들고 있어요.
        </p>
        <p className="mt-2 text-lg leading-8">취미는 러닝입니다.</p>
      </section>

      {newest && (
        <section aria-label="최근 기록" className="mt-20">
          <SheetHead
            year={newest.year}
            caption={`최근 ${recent.length}건 · 전체 ${entries.length}건`}
          />
          <LedgerHead />
          <ol>
            {recent.map((entry) => (
              <LedgerRow
                key={entry.slug}
                entry={entry}
                newest={entry === newest}
              />
            ))}
          </ol>
          <p className="mt-6 text-right">
            <NextLink
              href="/blog"
              className="text-base font-bold underline decoration-rule decoration-2 underline-offset-6 transition-colors duration-150 hover:decoration-ink"
            >
              전체 기록 {entries.length}건 보기
            </NextLink>
          </p>
        </section>
      )}
    </>
  );
}
