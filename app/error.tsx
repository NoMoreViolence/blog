"use client";

import NextLink from "next/link";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const message = error instanceof Error ? error.message : String(error);

  return (
    <section className="mt-20 max-w-2xl">
      <h1 className="font-ledger text-2xl text-seal">
        처리 중 오류가 발생했습니다
      </h1>
      <p className="mt-5 text-lg leading-8">
        페이지를 그리다가 멈췄어요. 잠시 뒤 다시 시도하거나 소개 면으로 돌아가
        주세요.
      </p>
      {message && (
        <p className="mt-4 font-ledger text-xs break-all text-ink-soft">
          {message}
        </p>
      )}
      <div className="mt-8 flex items-center gap-6">
        <button
          type="button"
          onClick={() => retry()}
          className="border border-ink px-4 py-2 text-base font-bold transition duration-150 ease-out hover:bg-sheet-deep active:scale-97"
        >
          다시 시도
        </button>
        <NextLink
          href="/"
          className="text-base font-bold underline decoration-rule decoration-2 underline-offset-6 hover:decoration-ink"
        >
          소개 면으로
        </NextLink>
      </div>
    </section>
  );
}
