import Link from "@/components/Link";

export interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "이지훈의 블로그",
  description: "A personal blog by Jihoon LEE",
};

export default async function Home() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="w-full text-md font-light text-charcoal-grey">
        <p>소프트웨어와 게임을 만듭니다.</p>
        <p>
          7년 반간 개발자로 일하다 나와서, 지금은 혼자 니치 소프트웨어와
          하이퍼캐주얼 게임을 만들고 있어요.
        </p>
        <p>취미는 러닝입니다.</p>
      </div>

      <div className="flex flex-col">
        <Link
          href="/blog"
          className="text-xl font-bold underline text-charcoal-grey"
        >
          블로그
        </Link>
      </div>
    </div>
  );
}
