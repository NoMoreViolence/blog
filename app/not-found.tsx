import NextLink from "next/link";

export default function NotFound() {
  return (
    <section className="mt-20 max-w-2xl">
      <h1 className="font-ledger text-2xl">조회되지 않는 기록입니다</h1>
      <p className="mt-5 text-lg leading-8">
        찾는 페이지가 없어요. 주소가 바뀌었거나 없는 페이지입니다.
      </p>
      <p className="mt-8 flex gap-6 text-base font-bold">
        <NextLink
          href="/"
          className="underline decoration-rule decoration-2 underline-offset-6 hover:decoration-ink"
        >
          소개 면으로
        </NextLink>
        <NextLink
          href="/blog"
          className="underline decoration-rule decoration-2 underline-offset-6 hover:decoration-ink"
        >
          전체 기록
        </NextLink>
      </p>
    </section>
  );
}
